import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { MagnifyingGlassIcon, PauseIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { PlayIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

export function TableData() {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Initial state set to null
  const router = useRouter();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_KEY}/quran.json`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Initialize the audio object only on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
    }
  }, []);

  // Function to handle both play and pause operations
  const playPause = (index, url) => {
    if (audioRef.current) { // Ensure audioRef.current is defined
      if (playingIndex === index) {
        if (!audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        if (playingIndex !== null) {
          audioRef.current.pause();
        }
        audioRef.current.src = url;
        audioRef.current.play();
        setPlayingIndex(index);
        setIsPlaying(true);
      }
    }
  };

  // Event listeners to update state when audio is played or paused
  useEffect(() => {
    if (audioRef.current) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      const audio = audioRef.current;
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  // Cleanup function to pause the audio when the component is unmounted
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const onClickHandler = (id) => {
    router.push(`/read-quran?surah=${id}`);
  };

  return (
    <Table className="my-10">
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.number_of_surah}>
            <TableCell className="w-[30px] text-center text-xs">{item.number_of_surah}</TableCell>
            <TableCell className="font-medium text-sm">
              <div className="flex justify-between">
                <div>
                  <p>{item.name}</p>
                  <p className="text-xs text-slate-700">
                    {item.type} | {item.number_of_ayah} Ayat
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-end font-semibold">{item.name_translations.ar}</TableCell>
            <TableCell className="text-center">
              <button onClick={() => playPause(index, item.recitation)}>
                {playingIndex === index && isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
              </button>
            </TableCell>
            <TableCell>
              <button onClick={() => onClickHandler(item.number_of_surah)}>
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
