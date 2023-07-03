import React, { useEffect, useState } from "react";

interface LanguageSelectProps {
  options: string[];
  selectedLanguage: string;
  onChange?: (selectedLanguage: string) => void;
}

const LanguageDropDown: React.FC<LanguageSelectProps> = ({
  options,
  selectedLanguage,
  onChange,
}) => {
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const language = event.target.value;    
    if (onChange) {
      onChange(language);
    }
  };

  return (
    <div>
      <label htmlFor="language">Select Language:</label>
      <select
        id="language"
        className="bg-white border border-gray-300 rounded px-3 py-2 mt-1 ml-2"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageDropDown;
