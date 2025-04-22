
import React from "react";
import { MemberType } from "@/pages/Membri";
import { Button } from "@/components/ui/button";
import { 
  Edit, 
  Trash2, 
  FileText, 
  Download 
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MemberListProps {
  members: MemberType[];
  onEdit: (member: MemberType) => void;
  onDelete: (id: string) => void;
  onSelect: (member: MemberType) => void;
  onGeneratePDF: (member: MemberType) => void;
  selectedMemberId?: string;
}

const MemberList: React.FC<MemberListProps> = ({ 
  members, 
  onEdit, 
  onDelete, 
  onSelect,
  onGeneratePDF,
  selectedMemberId 
}) => {
  const isMobile = useIsMobile();

  const formatDate = (date: Date | undefined) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (members.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum membro encontrado
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="space-y-4">
        {members.map((member) => (
          <Card 
            key={member.id}
            className={cn(
              "p-4 cursor-pointer transition-all",
              selectedMemberId === member.id 
                ? "ring-2 ring-primary" 
                : "hover:bg-muted/50"
            )}
            onClick={() => onSelect(member)}
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.email}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(member.birthDate)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {member.fiscalCode}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onEdit(member); }}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmar exclusão</DialogTitle>
                      <DialogDescription>
                        Tem certeza que deseja excluir {member.name}? Esta ação não pode ser desfeita.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                      <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button 
                          variant="destructive"
                          onClick={() => onDelete(member.id)}
                        >
                          Excluir
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => { e.stopPropagation(); onGeneratePDF(member); }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Data de Nascimento</TableHead>
            <TableHead>Código Fiscal</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} className={cn(
              "cursor-pointer",
              selectedMemberId === member.id ? "bg-muted" : ""
            )}>
              <TableCell 
                className="font-medium"
                onClick={() => onSelect(member)}
              >
                {member.name}
              </TableCell>
              <TableCell onClick={() => onSelect(member)}>
                {member.email}
              </TableCell>
              <TableCell onClick={() => onSelect(member)}>
                {formatDate(member.birthDate)}
              </TableCell>
              <TableCell onClick={() => onSelect(member)}>
                {member.fiscalCode || "-"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(member)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmar exclusão</DialogTitle>
                        <DialogDescription>
                          Tem certeza que deseja excluir {member.name}? Esta ação não pode ser desfeita.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2 mt-4">
                        <DialogClose asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button 
                            variant="destructive"
                            onClick={() => onDelete(member.id)}
                          >
                            Excluir
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onGeneratePDF(member)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberList;
