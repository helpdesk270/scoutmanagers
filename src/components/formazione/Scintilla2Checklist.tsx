
import React from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

const scintilla2Checklist: ChecklistSection[] = [
  {
    title: "IL MIO CLUB",
    items: [
      { id: 1, text: "Ho almeno 8 anni.", checked: false },
      { id: 2, text: "Spiego il motto.", checked: false },
      { id: 3, text: "Recito a memoria la legge.", checked: false },
      { id: 4, text: "So cantare il canto tema.", checked: false },
      { id: 5, text: 'Completo "Leggere III".', checked: false },
      { id: 6, text: 'Completo "Fiori".', checked: false },
    ]
  },
  {
    title: "IL MIO DIO",
    items: [
      { id: 7, text: "Realizzo un disegno o un lap-book che mostra l'ordine e il luogo di queste storie: Noè, Abramo, Mosè, Rut, Davide, Daniele, Ester.", checked: false },
      { id: 8, text: "Recito una poesia o canto una canzone per qualcuno che spiega come vivere per Dio.", checked: false },
      { id: 9, text: 'Completo "Bibbia I".', checked: false },
      { id: 10, text: "Trascorro ogni giorno un momento con Gesù per parlare con Lui e conoscerlo meglio. Tengo un registro.", checked: false },
      { id: 11, text: "Chiedo a due persone chi è il loro eroe della Bibbia preferito (non Gesù) e perché.", checked: false },
      { id: 12, text: 'Completo "Sabato Piacevole".', checked: false },
    ]
  },
  {
    title: "ME STESSO",
    items: [
      { id: 13, text: "Realizzo un lap-book dove mostro persone diverse che si prendono cura di me.", checked: false },
      { id: 14, text: 'Completo "Ginnasta I".', checked: false },
    ]
  },
  {
    title: "LA MIA FAMIGLIA",
    items: [
      { id: 15, text: "Ritaglio o realizzo un disegno che mostra una caratteristica per ogni membro della mia famiglia.", checked: false },
      { id: 16, text: 'Completo "Cuoco".', checked: false },
      { id: 17, text: 'Completo "Guida".', checked: false },
    ]
  },
  {
    title: "IL MIO MONDO",
    items: [
      { id: 18, text: 'Completo "Ascoltare".', checked: false },
      { id: 19, text: 'Completo "Amico degli animali".', checked: false },
    ]
  }
];

const Scintilla2Checklist = () => {
  const [checklist, setChecklist] = React.useState(scintilla2Checklist);

  const handleCheckItem = (sectionIndex: number, itemIndex: number) => {
    const newChecklist = [...checklist];
    newChecklist[sectionIndex].items[itemIndex].checked = !newChecklist[sectionIndex].items[itemIndex].checked;
    setChecklist(newChecklist);
  };

  return (
    <div className="space-y-6">
      {checklist.map((section, sectionIndex) => (
        <Card key={section.title} className="p-6">
          <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
          <div className="space-y-4">
            {section.items.map((item, itemIndex) => (
              <div key={item.id} className="flex items-start space-x-3">
                <Checkbox
                  id={`scintilla2-${item.id}`}
                  checked={item.checked}
                  onCheckedChange={() => handleCheckItem(sectionIndex, itemIndex)}
                  className="mt-1"
                />
                <Label
                  htmlFor={`scintilla2-${item.id}`}
                  className="text-sm leading-tight cursor-pointer"
                >
                  {item.text}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Scintilla2Checklist;
