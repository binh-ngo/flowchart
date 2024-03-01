import { useState, ChangeEvent, useRef } from 'react';

interface CreateBubbleProps {
  projectName: string;
  isEntered: boolean;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  setIsEntered: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateBubble = ({ isEntered, setIsEntered, projectName, setProjectName }: CreateBubbleProps) => {

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setProjectName(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setIsEntered(true);
      console.log(isEntered)
    }
  };

  return (
  <>
      <div className="w-auto min-w-40 h-auto min-h-36 border-2 border-gray-300 rounded-full flex items-center justify-center shadow-md transform transition-transform hover:scale-110 relative overflow-hidden">
          <form>
            <textarea
              className="relative z-10 font-sans text-black text-xl text-center font-semibold overflow-hidden resize-none align-middle"
              name="projectName"
              value={projectName}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Project name"
              style={{ width: projectName.length * 1.3 + 100 + 'px', 
              height: projectName.length * 1.3 + 100 + 'px', 
              padding: projectName.length * 0.3 + 8 + 'px',
              outline: 0  }}
              />
          </form>
      </div>
  </>
  );
};
