
import React, { useState } from "react";
import { AttendanceRecord, MemberType } from "@/types/member";
import { 
  Card, 
  CardContent, 
  CardDescription, 
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
import { Calendar, ChevronLeft, Check, X, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

interface MemberAttendanceProps {
  member: MemberType;
  onAddAttendance: (record: Omit<AttendanceRecord, "id">) => void;
  onBack: () => void;
}

const MemberAttendance: React.FC<MemberAttendanceProps> = ({ 
  member, 
  onAddAttendance, 
  onBack 
}) => {
  const [isAddingAttendance, setIsAddingAttendance] = useState(false);
  
  const form = useForm({
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd"),
      activity: "",
      present: true
    }
  });
  
  const handleSubmit = (data: any) => {
    onAddAttendance(data);
    setIsAddingAttendance(false);
    form.reset({
      date: format(new Date(), "yyyy-MM-dd"),
      activity: "",
      present: true
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Torna alla lista
        </Button>
        <Button onClick={() => setIsAddingAttendance(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Registra Presenza
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Presenze di {member.name}
          </CardTitle>
          <CardDescription>
            Registro delle presenze alle attività
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isAddingAttendance && (
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Nuova Presenza</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsAddingAttendance(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                      name="activity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Attività</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome dell'attività" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="present"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Presenza</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <input 
                                type="checkbox" 
                                id="present" 
                                className="h-4 w-4"
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                              />
                              <label htmlFor="present">Presente</label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button type="button" variant="outline" onClick={() => setIsAddingAttendance(false)}>
                        Annulla
                      </Button>
                      <Button type="submit">
                        Registra Presenza
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
                  <TableHead>Data</TableHead>
                  <TableHead>Attività</TableHead>
                  <TableHead>Presenza</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {member.attendance.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      Nessuna presenza registrata
                    </TableCell>
                  </TableRow>
                ) : (
                  member.attendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.activity}</TableCell>
                      <TableCell>
                        {record.present ? (
                          <div className="flex items-center text-green-600">
                            <Check className="mr-1 h-4 w-4" />
                            Presente
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <X className="mr-1 h-4 w-4" />
                            Assente
                          </div>
                        )}
                      </TableCell>
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

export default MemberAttendance;
