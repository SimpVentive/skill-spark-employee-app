
import H5PContentCard from './H5PContentCard';

interface H5PContent {
  id: string;
  title: string;
  contentType: string;
  description: string;
  embedCode: string;
  isEmbedded: boolean;
  interactions: number;
  completions: number;
  averageScore: number;
  createdAt: string;
  lastInteraction?: string;
}

interface H5PContentLibraryProps {
  contents: H5PContent[];
  onPlay: (content: H5PContent) => void;
}

const H5PContentLibrary = ({ contents, onPlay }: H5PContentLibraryProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">H5P Content Library</h3>
      <div className="grid gap-4">
        {contents.map((content) => (
          <H5PContentCard 
            key={content.id} 
            content={content} 
            onPlay={onPlay}
          />
        ))}
      </div>
    </div>
  );
};

export default H5PContentLibrary;
