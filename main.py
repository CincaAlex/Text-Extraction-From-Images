import zipfile
from io import BytesIO
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
import pytesseract
import os

# Configure Tesseract path
pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for frontend requests

@app.route('/upload', methods=['POST'])
def upload_images_zip():
    if 'images' not in request.files:
        return jsonify({'error': 'No images uploaded'}), 400

    uploaded_files = request.files.getlist('images')
    memory_file = BytesIO()
    extracted_texts = []

    try:
        with zipfile.ZipFile(memory_file, 'w') as zf:
            for idx, image_file in enumerate(uploaded_files):
                image_path = f"temp_{image_file.filename}"
                image_file.save(image_path)
                try:
                    text = pytesseract.image_to_string(Image.open(image_path))
                except Exception as ocr_error:
                    text = f"Error processing image {idx + 1}: {ocr_error}"
                zf.writestr(f'image_{idx + 1}.txt', text)
                extracted_texts.append({'filename': image_file.filename, 'text': text})
                os.remove(image_path)

        memory_file.seek(0)
        zip_data = memory_file.getvalue()

        return jsonify({
            'texts': extracted_texts,
            'zip_url': '/download-zip',
            'zip_data': zip_data.hex()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/download-zip', methods=['POST'])
def download_zip():
    zip_hex_data = request.json.get('zip_data')
    if not zip_hex_data:
        return jsonify({'error': 'No zip data provided'}), 400

    zip_data = BytesIO(bytes.fromhex(zip_hex_data))
    return send_file(
        zip_data,
        mimetype='application/zip',
        as_attachment=True,
        download_name='extracted-texts.zip'
    )

if __name__ == '__main__':
    app.run(debug=True)
