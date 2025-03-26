
import React, { useState } from "react";
import { Achievement, MemberType } from "@/pages/Membri";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Award, ChevronLeft, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

interface MemberAchievementsProps {
  member: MemberType;
  onAddAchievement: (achievement: Omit<Achievement, "id">) => void;
  onBack: () => void;
}

const MemberAchievements: React.FC<MemberAchievementsProps> = ({ 
  member, 
  onAddAchievement, 
  onBack 
}) => {
  const [isAddingAchievement, setIsAddingAchievement] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      date: format(new Date(), "yyyy-MM-dd"),
      description: ""
    }
  });
  
  const handleSubmit = (data: Omit<Achievement, "id">) => {
    onAddAchievement(data);
    setIsAddingAchievement(false);
    form.reset();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Torna alla lista
        </Button>
        <Button onClick={() => setIsAddingAchievement(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Aggiungi Conquista
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Conquiste di {member.name}
          </CardTitle>
          <CardDescription>
            Elenco delle conquiste e specializzazioni ottenute
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isAddingAchievement && (
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Nuova Conquista</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsAddingAchievement(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Conquista</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome della conquista" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrizione</FormLabel>
                          <FormControl>
                            <Input placeholder="Descrizione della conquista" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button type="button" variant="outline" onClick={() => setIsAddingAchievement(false)}>
                        Annulla
                      </Button>
                      <Button type="submit">
                        Aggiungi Conquista
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrizione</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {member.achievements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      Nessuna conquista registrata
                    </TableCell>
                  </TableRow>
                ) : (
                  member.achievements.map((achievement) => (
                    <TableRow key={achievement.id}>
                      <TableCell className="font-medium">{achievement.name}</TableCell>
                      <TableCell>{achievement.date}</TableCell>
                      <TableCell>{achievement.description}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberAchievements;
