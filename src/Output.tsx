import { useCallback, useEffect, useRef } from 'react';
import AppStyles from './App.module.css';

const Output: React.FC<{ input: string }> = ({ input }) => {
  const preview = useRef<HTMLDivElement>(null);

  const cleanChunk = (chunk: string) => chunk.split(' ').slice(1).join(' ');

  const getChunks = useCallback(() => {
    let newString = '';
    input
      .split(/(#+.*)|([^\n]+-+.*)|(\n\n+)/)
      .filter((chunk) => chunk && chunk !== '\n')
      .forEach((chunk) => {
        switch (true) {
          case chunk.startsWith('# '):
            newString += `<h1>${cleanChunk(chunk)}</h1>`;
            break;
          case chunk.startsWith('## '):
            newString += `<h2>${cleanChunk(chunk)}</h2>`;
            break;
          case chunk.startsWith('---') && new Set(chunk.split('')).size === 1:
            newString += '<hr/>';
            break;
          default:
            newString += `<p>${chunk}</p>`;
        }
      });
    preview.current!.innerHTML = newString;
  }, [input]);

  useEffect(() => {
    getChunks();
  }, [getChunks]);

  return <div className={AppStyles.Output} ref={preview} />;
};

export default Output;
