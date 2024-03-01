import { useState, ChangeEvent } from 'react';

type BubbleProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export const Bubble = ({text, setText}: BubbleProps) => {
  const [isEntered, setIsEntered] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value); 
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setIsEntered(true);
    }
  };


  return (
  <div className='flex flex-col justify-center items-center'>
    <div className="w-auto min-w-40 h-auto min-h-36 border-2 border-gray-300 rounded-full flex items-center justify-center shadow-md transform transition-transform hover:scale-110 relative overflow-hidden">
        <form>
          <textarea
            className="relative z-10 font-sans text-black text-xl text-center font-semibold overflow-hidden resize-none align-middle"
            name="text"
            value={text}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Options"
            style={{  width: text.length * 1.3 + 100 + 'px', 
            height: text.length * 1.3 + 100 + 'px', 
            padding: text.length * 0.3 + 8 + 'px',
            outline: 0  }}
            />
        </form>
    </div>
  {isEntered && 
    <div className='flex space-x-4'>
      <Bubble text={text} setText={setText}/>
      <Bubble text={text} setText={setText}/>
    </div>
    }
  </div>
  );
};
