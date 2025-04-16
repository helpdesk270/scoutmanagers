
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

const tizzoniChecklist: ChecklistSection[] = [
  {
    title: "IL MIO CLUB",
    items: [
      { id: 1, text: "Ho almeno 6 anni.", checked: false },
      { id: 2, text: "Recito a memoria il motto.", checked: false },
      { id: 3, text: "Conosco la legge.", checked: false },
      { id: 4, text: "Conosco il canto tema.", checked: false },
      { id: 5, text: "Conosco l'uniforme.", checked: false },
      { id: 6, text: 'Completo "Leggere I".', checked: false },
    ]
  },
  {
    title: "IL MIO DIO",
    items: [
      { id: 7, text: "Leggo la storia di Giuseppe e faccio o un disegno o un lap-book che rappresenti quello che ho imparato.", checked: false },
      { id: 8, text: "Comprendo l'amore e la cura di Gesù per i bambini imparando a memoria Matteo 19:14.", checked: false },
      { id: 9, text: "Partecipo ogni giorno al culto di famiglia. Tengo un registro.", checked: false },
    ]
  },
  {
    title: "ME STESSO",
    items: [
      { id: 10, text: "Realizzo un lap-book in cui dimostro di conoscere il mio nome completo, l'indirizzo e il telefono.", checked: false },
      { id: 11, text: 'Completo "Igiene".', checked: false },
    ]
  },
  {
    title: "LA MIA FAMIGLIA",
    items: [
      { id: 12, text: "Imparo a memoria il 5° comandamento.", checked: false },
      { id: 13, text: "Se possibile mostro una foto della mia famiglia alla pattuglia.", checked: false },
      { id: 14, text: "Scopro cosa dice il 5° comandamento sulla famiglia.", checked: false },
      { id: 15, text: "Metto in atto tre modi per onorare la mia famiglia.", checked: false },
      { id: 16, text: 'Completo "Prevenzione Stradale".', checked: false },
    ]
  },
  {
    title: "IL MIO MONDO",
    items: [
      { id: 17, text: "Conosco la storia della creazione e quello che è stato creato in ciascun giorno. Realizzo un lap-book sulla creazione.", checked: false },
      { id: 18, text: 'Completo "Amico della natura".', checked: false },
    ]
  }
];

const TizzoniChecklist = () => {
  const [checklist, setChecklist] = React.useState(tizzoniChecklist);

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
                  id={`item-${item.id}`}
                  checked={item.checked}
                  onCheckedChange={() => handleCheckItem(sectionIndex, itemIndex)}
                  className="mt-1"
                />
                <Label
                  htmlFor={`item-${item.id}`}
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

export default TizzoniChecklist;
