
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

const scintillaChecklist: ChecklistSection[] = [
  {
    title: "IL MIO CLUB",
    items: [
      { id: 1, text: "Ho almeno 7 anni.", checked: false },
      { id: 2, text: "Ripeto a memoria il motto.", checked: false },
      { id: 3, text: "Imparo la legge.", checked: false },
      { id: 4, text: "Imparo il canto tema.", checked: false },
      { id: 5, text: "So spiegare l'uniforme.", checked: false },
      { id: 6, text: 'Completo "Leggere II".', checked: false },
    ]
  },
  {
    title: "IL MIO DIO",
    items: [
      { id: 7, text: "Comprendo il piano della salvezza di Gesù per i bambini e imparo Giovanni 3:16.", checked: false },
      { id: 8, text: "Realizzo un disegno o un lap-book o racconto una storia sulla gioia di essere salvati da Gesù.", checked: false },
      { id: 9, text: 'Leggo la storia del "Buon Pastore" e comprendo la cura di Dio memorizzando il Salmo 23:1.', checked: false },
      { id: 10, text: "Partecipo ogni giorno al culto di famiglia. Tengo un registro.", checked: false },
      { id: 11, text: "Chiedo a qualcuno che conosco perché prega.", checked: false },
    ]
  },
  {
    title: "ME STESSO",
    items: [
      { id: 12, text: "Realizzo un disegno di me stesso, e lo decoro con disegni e parole che dicono cose buone su di me.", checked: false },
      { id: 13, text: 'Completo "Salute".', checked: false },
    ]
  },
  {
    title: "LA MIA FAMIGLIA",
    items: [
      { id: 14, text: "Mi faccio raccontare una storia sulla mia famiglia e sono capace di raccontarla agli altri.", checked: false },
      { id: 15, text: 'Completo "Lavori Domestici".', checked: false },
      { id: 16, text: 'Completo "Osservatore".', checked: false },
    ]
  },
  {
    title: "IL MIO MONDO",
    items: [
      { id: 17, text: "Leggo la storia sull'amicizia di Davide e Gionatan.", checked: false },
      { id: 18, text: "Realizzo un lap-book su me e i miei amici.", checked: false },
      { id: 19, text: 'Completo "Amico degli alberi".', checked: false },
    ]
  }
];

const ScintillaChecklist = () => {
  const [checklist, setChecklist] = React.useState(scintillaChecklist);

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
                  id={`scintilla-${item.id}`}
                  checked={item.checked}
                  onCheckedChange={() => handleCheckItem(sectionIndex, itemIndex)}
                  className="mt-1"
                />
                <Label
                  htmlFor={`scintilla-${item.id}`}
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

export default ScintillaChecklist;
