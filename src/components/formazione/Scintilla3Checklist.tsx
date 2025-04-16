
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

const scintilla3Checklist: ChecklistSection[] = [
  {
    title: "IL MIO CLUB",
    items: [
      { id: 1, text: "Ho almeno 9 anni.", checked: false },
      { id: 2, text: "Ripasso il motto.", checked: false },
      { id: 3, text: "Spiego la legge.", checked: false },
      { id: 4, text: 'Completo "Leggere IV".', checked: false },
      { id: 5, text: 'Completo "Stagioni".', checked: false },
    ]
  },
  {
    title: "IL MIO DIO",
    items: [
      { id: 6, text: "Realizzo un disegno o un lap-book che mostra la vita di Gesù: nascita, battesimo, miracoli, parabole, morte, resurrezione, ritorno dal cielo.", checked: false },
      { id: 7, text: "Metto in scena con il mio club uno degli episodi sopraelencati.", checked: false },
      { id: 8, text: 'Completo "Bibbia II".', checked: false },
      { id: 9, text: "Trascorro ogni giorno un momento con Gesù per parlare con Lui e conoscerlo meglio. Tengo un registro.", checked: false },
      { id: 10, text: "Chiedo a tre persone qual è la loro storia preferita su Gesù e perché.", checked: false },
      { id: 11, text: 'Completo "Le parabole di Gesù".', checked: false },
    ]
  },
  {
    title: "ME STESSO",
    items: [
      { id: 12, text: "Realizzo un collage in cui mostro alcune delle cose che posso fare per servire gli altri.", checked: false },
      { id: 13, text: 'Completo "Temperanza".', checked: false },
    ]
  },
  {
    title: "LA MIA FAMIGLIA",
    items: [
      { id: 14, text: "Chiedo a ciascun membro della mia famiglia uno dei suoi ricordi preferiti.", checked: false },
      { id: 15, text: 'Completo "Atti di gentilezza".', checked: false },
      { id: 16, text: 'Completo "Sicurezza".', checked: false },
    ]
  },
  {
    title: "IL MIO MONDO",
    items: [
      { id: 17, text: 'Completo "Cortesia".', checked: false },
      { id: 18, text: "Conosco e spiego la bandiera della mia nazione.", checked: false },
      { id: 19, text: "Nomino la capitale del mio Paese e il nome del suo leader.", checked: false },
      { id: 20, text: 'Completo "Paesi del Mondo".', checked: false },
      { id: 21, text: 'Completo "Esploratore".', checked: false },
    ]
  }
];

const Scintilla3Checklist = () => {
  const [checklist, setChecklist] = React.useState(scintilla3Checklist);

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
                  id={`scintilla3-${item.id}`}
                  checked={item.checked}
                  onCheckedChange={() => handleCheckItem(sectionIndex, itemIndex)}
                  className="mt-1"
                />
                <Label
                  htmlFor={`scintilla3-${item.id}`}
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

export default Scintilla3Checklist;
