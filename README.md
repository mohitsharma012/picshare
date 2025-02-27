# PicShare

PicShare is a professional open-source image hosting platform that enables users to **upload images** and obtain an **instant public link** for seamless sharing and integration. Built with **Next.js** for a dynamic frontend and **AWS S3** for reliable storage, PicShare ensures high performance and security.

## ✨ Features
- 📤 **Effortless Image Upload**: Upload images with ease.
- 🔗 **Instant Public Link Generation**: Get a shareable link immediately.
- 🛡️ **Secure AWS S3 Storage**: Reliable cloud storage.
- ⚡ **Optimized for Speed & Performance**: Fast image hosting.
- 🖼️ **Supports Multiple Formats**: Compatible with JPEG, PNG, GIF, and more.
- 💡 **Open-Source & Community-Driven**: Contribute and enhance the project.

## 🚀 Tech Stack
- **Frontend:** Next.js, React, TypeScript
- **Backend:** Next.js API Routes
- **Storage:** AWS S3
- **Deployment:** Vercel / AWS

## 🛠️ Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/PicShare.git
cd PicShare
```

### 2️⃣ Install Dependencies
```sh
npm install  # or yarn install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file in the root directory and configure the following:
```env
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET_NAME=your_s3_bucket_name
NEXT_PUBLIC_S3_BUCKET_URL=https://yourbucket.s3.amazonaws.com/
```

### 4️⃣ Run the Project
```sh
npm run dev  # or yarn dev
```
Application will be accessible at **http://localhost:3000**.

## 📸 How It Works
1. **Upload** an image via the user-friendly interface.
2. Image is **securely stored in AWS S3**.
3. A **public link** is automatically generated.
4. The link can be used **anywhere**—websites, blogs, forums, and more.

## 🎯 Contribution Guidelines
We welcome contributions! Follow these steps to contribute:
1. **Fork** the repository.
2. Create a **new branch** for your feature or fix.
3. **Commit** your modifications with clear messages.
4. Open a **Pull Request** for review.

## 📜 License
PicShare is an **open-source** project licensed under the **MIT License**.


---
Developed with ❤️ by [Mohit Sharma](https://www.mohitcodes.com/).

