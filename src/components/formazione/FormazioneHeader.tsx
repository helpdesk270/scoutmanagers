
import React from "react";

interface FormazioneHeaderProps {
  title: string;
  description: string;
}

const FormazioneHeader: React.FC<FormazioneHeaderProps> = ({ title, description }) => {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </header>
  );
};

export default FormazioneHeader;
