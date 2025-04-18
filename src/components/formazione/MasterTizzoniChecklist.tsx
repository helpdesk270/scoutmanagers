
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

const masterTizzoniChecklist: ChecklistSection[] = [
  {
    title: "IL MIO CLUB",
    items: [
      { id: 1, text: "Ho almeno 11 anni.", checked: false },
      { id: 2, text: "Ripasso il motto e la legge.", checked: false },
      { id: 3, text: "Racconto come il motto e la legge mi aiutano a comportarmi come Gesù.", checked: false },
      { id: 4, text: 'Completo "Mani di servizio".', checked: false },
    ]
  },
  {
    title: "IL MIO DIO",
    items: [
      { id: 5, text: "Realizzo un cartellone che mostra l'ordine e il luogo di queste storie: Paolo, Martin Lutero, Ellen White, te stesso.", checked: false },
      { id: 6, text: "Scrivo un articolo su uno dei personaggi sopraelencati, che mostra questa persona come eroe spirituale.", checked: false },
      { id: 7, text: 'Completo "Bibbia IV".', checked: false },
      { id: 8, text: "Trascorro ogni giorno un momento con Gesù per parlare con Lui e conoscerlo meglio. Tengo un registro.", checked: false },
      { id: 9, text: "Chiedo a tre persone perché hanno deciso di dare la loro vita a Gesù.", checked: false },
      { id: 10, text: 'Completo "La mia chiesa".', checked: false },
    ]
  },
  {
    title: "ME STESSO",
    items: [
      { id: 11, text: "Elenco alcuni interessi speciali e abilità che Dio mi ha dato.", checked: false },
      { id: 12, text: 'Completo una specializzazione della categoria "Arte e Abilità".', checked: false },
      { id: 13, text: "Imparo i passi da fare per prendere giuste decisioni.", checked: false },
      { id: 14, text: "Spiego e dimostro come posso usarli per risolvere due problemi reali.", checked: false },
    ]
  },
  {
    title: "LA MIA FAMIGLIA",
    items: [
      { id: 15, text: "Condivido un cambiamento importante nella mia famiglia e racconto come l'ho vissuto.", checked: false },
      { id: 16, text: "Aiuto a pianificare un culto speciale in famiglia o una serata in famiglia o una gita in famiglia. Lo racconto alla mia pattuglia.", checked: false },
      { id: 17, text: 'Completo "Cooperazione".', checked: false },
    ]
  },
  {
    title: "IL MIO MONDO",
    items: [
      { id: 18, text: 'Completo "Discepoli".', checked: false },
      { id: 19, text: 'Completo "Nodi".', checked: false },
      { id: 20, text: 'Completo "Astronomo".', checked: false },
      { id: 21, text: 'Completo "Habitat".', checked: false },
    ]
  }
];

const MasterTizzoniChecklist = () => {
  const [checklist, setChecklist] = React.useState(masterTizzoniChecklist);

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
                  id={`master-tizzoni-${item.id}`}
                  checked={item.checked}
                  onCheckedChange={() => handleCheckItem(sectionIndex, itemIndex)}
                  className="mt-1"
                />
                <Label
                  htmlFor={`master-tizzoni-${item.id}`}
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

export default MasterTizzoniChecklist;

