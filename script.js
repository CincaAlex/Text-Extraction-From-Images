document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById('image');
    const spinner = document.getElementById('loadingSpinner');
    const resultSection = document.getElementById('result');
    const extractedTextContainer = document.getElementById('extractedText');
    const downloadAllButton = document.getElementById('downloadAllButton');

    if (fileInput.files.length === 0) {
        alert('Please select one or more files to upload.');
        return;
    }

    for (const file of fileInput.files) {
        formData.append('images', file);
    }

    spinner.style.display = 'flex';
    resultSection.style.display = 'none';
    downloadAllButton.style.display = 'none';
    extractedTextContainer.innerHTML = '';

    try {
        const response = await fetch('http://127.0.0.1:5000/upload', {//copy the address from the command console
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to process the files.');
        }

        const result = await response.json();
        const { texts, zip_data } = result;

        resultSection.style.display = 'block';
        texts.forEach((item) => {
            const textBlock = document.createElement('div');
            textBlock.innerHTML = `<strong>${item.filename}:</strong><pre>${item.text}</pre>`;
            extractedTextContainer.appendChild(textBlock);
        });

        downloadAllButton.style.display = 'block';
        downloadAllButton.onclick = async () => {
            const zipResponse = await fetch('http://127.0.0.1:5000/download-zip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ zip_data }),
            });

            if (!zipResponse.ok) {
                alert('Failed to download the ZIP file.');
                return;
            }

            const zipBlob = await zipResponse.blob();
            const url = URL.createObjectURL(zipBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'extracted-texts.zip';
            link.click();
            URL.revokeObjectURL(url);
        };
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        spinner.style.display = 'none';
    }
});
