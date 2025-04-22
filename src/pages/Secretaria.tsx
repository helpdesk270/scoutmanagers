
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, BookCheck, Award, BarChart3, Printer } from "lucide-react";

const Secretaria = () => {
  const secretariaModules = [
    {
      title: "Cadastro Membros",
      description: "Gerencie membros: Bambini, Animatori e Accompagnatore",
      icon: <UserPlus className="h-8 w-8 text-primary" />,
      path: "/secretaria/membros"
    },
    {
      title: "Cadastro Percurso",
      description: "Administre percursos por formação e checklists",
      icon: <BookCheck className="h-8 w-8 text-primary" />,
      path: "/secretaria/percurso"
    },
    {
      title: "Cadastro Especialidades",
      description: "Gerencie especialidades por formação e categorias",
      icon: <Award className="h-8 w-8 text-primary" />,
      path: "/secretaria/especialidades"
    },
    {
      title: "Relatórios",
      description: "Panorâmica, participação e relatórios personalizados",
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      path: "/secretaria/relatorios"
    },
    {
      title: "Impressão",
      description: "Fichas cadastrais, adesões e outros documentos",
      icon: <Printer className="h-8 w-8 text-primary" />,
      path: "/secretaria/impressao"
    }
  ];

  return (
    <div className="container py-6 md:py-8 animate-fade-in">
      <h1 className="text-2xl font-bold md:text-3xl mb-6">Secretaria</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {secretariaModules.map((module) => (
          <Link key={module.path} to={module.path} className="no-underline">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  {module.icon}
                </div>
                <CardTitle className="mt-4">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-primary">
                  Clique para acessar
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Secretaria;
