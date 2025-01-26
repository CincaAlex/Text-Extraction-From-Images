
# Text-Extraction-From-Images  
📄 **Image Text Extractor with OCR**  

A user-friendly web application that utilizes Optical Character Recognition (OCR) to extract text from uploaded images.  

### Why I Built This  
During my university exam session, I needed a reliable tool to extract text from images. The available options were paid, so I created this free solution.  

### Features  
- 🖼️ Upload images and extract text with ease.  
- 🔍 Preview the extracted text directly on the website.  
- 📦 Download the extracted text as a ZIP file for offline use.  

### Installation & Setup  

1. Install the necessary libraries:  
   ```bash
   pip install flask flask-cors pillow pytesseract
   pip install Flask
   ```

2. Download the Tesseract OCR installer from [here](https://github.com/tesseract-ocr/tesseract) and install it.  

3. Add Tesseract to your system PATH:  
   ```
   C:\Program Files\Tesseract-OCR\
   ```

4. Verify the installation by running the following command:  
   ```bash
   tesseract --version
   ```

5. Run the app:  
   Navigate to the folder with the `app.py` file and run:  
   ```bash
   python app.py
   ```

6. **Update the `script.js` file**  
   Change the following line in `script.js`:  
   ```javascript
   const response = await fetch('http://127.0.0.1:5000/upload', 
   ```  
   Replace `'http://127.0.0.1:5000/upload'` with the correct HTTP address that appears in your console after running the app.

### 📸 Screenshots  
Here’s a glimpse of the app in action:  
![Alt text](img/img.png)  
![Alt text](img/img1.png)  
