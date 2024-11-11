require("dotenv").config();
const express = require("express");
const { sendJson } = require("./utils/sendResponse");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { isStudyRelated } = require("./utils/isStudyRelatedContent");
const app = express();
const port = 3000;
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

app.post("/analyze", async (req, res, next) => {
  const mediaPath = "./public/web-page8.jpg";

  try {
    const uploadResult = await fileManager.uploadFile(mediaPath, {
      mimeType: "image/jpeg",
      displayName: "web-page",
    });

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    if (!genAI) {
      throw new Error("Missing or invalid API key");
    }
    // console.log(uploadResult.file.uri)

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      "Is there any vulgar content in this image? Please not if you are writing no vulger keep it like this 'no-vulgar' Also check if there's anything in the image that's not related to study, coding, UI, or website. Provide the answer only in keywords take your time and aswer every keyword relates to that if it a webpage or ui.",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);

    const generatedText = result.response.text();

    const isAppropriate = isStudyRelated(generatedText);

    // console.log(isAppropriate);

    sendJson(req, res, next, { isAppropriate,generatedText });
  } catch (error) {
    // console.error(error);

    // Access detailed error response (if available)
    const errorResponse = error.response;
    if (errorResponse) {
     return sendJson(req, res, next, { isAppropriate:false, generatedText: errorResponse.candidates[0].safetyRatings });
    }

    // Send appropriate response to user (consider user-friendly message)
    sendJson(req, res, next, { error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
