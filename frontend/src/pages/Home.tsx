import { useState, useEffect } from 'react';
import { Bubble } from '../components/Bubble'
import { CreateBubble } from '../components/CreateBubble'

export const Home = () => {
  const [isEntered, setIsEntered] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    console.log(projectName)
    console.log(text)
  }, [text, projectName]);

  return (
    <div className='flex flex-col justify-center items-center h-screen'> 
      <CreateBubble
        projectName={projectName}
        isEntered={isEntered} 
        setIsEntered={setIsEntered}
        setProjectName={setProjectName} />
      {isEntered && 
      <div className='flex space-x-4'>
      <Bubble text={text} setText={setText}/>
      <Bubble text={text} setText={setText}/>
      </div>
      }
    </div>
  )
}
