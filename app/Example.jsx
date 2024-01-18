// huggingface.jsx
"use client";
import React, { useState } from "react";
import axios from "axios";

const Example = () => {
  const [translatedText, setTranslatedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [language, setLanguage] = useState("en-hi"); // Default language pair

  const fetchTranslation = async () => {
    const response = await axios({
      method: "post",
      url: "/api/huggingface", // Your serverless function endpoint
      data: { text: inputText, lang: language }, // Sending the selected language to the backend
      headers: { "Content-Type": "application/json" },
    });

    setTranslatedText(response.data.translation_text);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const [loading, setLoading] = useState(false);

  const handleTranslateClick = async () => {
    setLoading(true);
    await fetchTranslation();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-md sm:mx-auto">
      <div className="bg-opacity-30 backdrop-filter backdrop-blur-lg bg-white bg-opacity-20 shadow-xl sm:rounded-md p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">HuggingFace Language Translator</h1>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-600">Select Language</label>
              <select
                onChange={handleLanguageChange}
                value={language}
                className="p-2 bg-opacity-40 border border-purple-300 rounded text-gray-800 focus:outline-none focus:border-purple-500"
              >
                <option value="en-hi">English to Hindi</option>
                <option value="en-es">English to Spanish</option>
                <option value="en-de">English to German</option>
                <option value="en-fr">English to French</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">Input Text</label>
              <input
                type="text"
                onChange={handleInputChange}
                value={inputText}
                className="p-2 bg-opacity-40 border border-purple-300 rounded text-gray-800 focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              onClick={handleTranslateClick}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-400 to-orange-500 text-white rounded shadow-md hover:shadow-lg transition duration-300 relative"
              disabled={loading}
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
              {loading ? 'Translating...' : 'Translate'}
            </button>
          </div>
          <div className="pt-6 text-base leading-6 font-bold text-gray-800">
            <p className="text-gray-800">{translatedText}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Example;
