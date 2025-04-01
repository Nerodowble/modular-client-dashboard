
import React, { useState } from 'react';
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  DollarSign,
  Users, 
  LineChart,
  BarChart2,
  ListChecks 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ClientSelector from '@/components/ClientSelector';
import MetricCard from '@/components/MetricCard';
import DataTable from '@/components/DataTable';
import ChartContainer from '@/components/ChartContainer';
import DashboardContainer from '@/components/DashboardContainer';
import ReportHistory from '@/components/ReportHistory';
import InfoField from '@/components/InfoField';

// Dados simulados para o dashboard
const mockClients = [
  { id: "1", name: "Cliente ABC Ltda." },
  { id: "2", name: "Empresa XYZ S.A." },
  { id: "3", name: "Corporação 123" },
];

const mockClientData = {
  "1": {
    name: "Cliente ABC Ltda.",
    contact: "João Silva",
    email: "joao.silva@abc.com",
    phone: "(11) 9876-5432",
    address: "Rua das Flores, 123 - São Paulo, SP",
    contract: {
      startDate: "01/01/2023",
      endDate: "31/12/2023",
      value: "R$ 120.000,00",
      status: "Ativo"
    },
    metrics: {
      revenue: "R$ 54.250,00",
      customers: 126,
      tasks: 38,
      completionRate: "87%"
    },
    trends: {
      revenue: 12.5,
      customers: 8.2,
      tasks: -4.3,
      completionRate: 3.7
    },
    monthlyData: [
      { month: "Jan", revenue: 4200, customers: 95 },
      { month: "Fev", revenue: 4800, customers: 100 },
      { month: "Mar", revenue: 5100, customers: 105 },
      { month: "Abr", revenue: 4900, customers: 110 },
      { month: "Mai", revenue: 5300, customers: 115 },
      { month: "Jun", revenue: 5700, customers: 120 },
      { month: "Jul", revenue: 6250, customers: 126 }
    ],
    productData: [
      { name: "Produto A", value: 35 },
      { name: "Produto B", value: 25 },
      { name: "Produto C", value: 20 },
      { name: "Produto D", value: 15 },
      { name: "Outros", value: 5 },
    ],
    tasksList: [
      { id: "1", task: "Análise mensal", status: "Concluído", dueDate: "15/07/2023", assignee: "Carlos Gomes" },
      { id: "2", task: "Relatório financeiro", status: "Em andamento", dueDate: "22/07/2023", assignee: "Ana Pereira" },
      { id: "3", task: "Reunião de alinhamento", status: "Pendente", dueDate: "28/07/2023", assignee: "João Silva" },
      { id: "4", task: "Atualização de sistema", status: "Concluído", dueDate: "10/07/2023", assignee: "Mariana Costa" },
      { id: "5", task: "Treinamento da equipe", status: "Em andamento", dueDate: "25/07/2023", assignee: "Paulo Mendes" }
    ],
    reports: [
      { id: "1", date: "30/06/2023", title: "Relatório Mensal - Junho 2023", downloadUrl: "#" },
      { id: "2", date: "31/05/2023", title: "Relatório Mensal - Maio 2023", downloadUrl: "#" },
      { id: "3", date: "30/04/2023", title: "Relatório Mensal - Abril 2023", downloadUrl: "#" },
      { id: "4", date: "31/03/2023", title: "Relatório Mensal - Março 2023", downloadUrl: "#" },
      { id: "5", date: "28/02/2023", title: "Relatório Mensal - Fevereiro 2023", downloadUrl: "#" },
      { id: "6", date: "31/01/2023", title: "Relatório Mensal - Janeiro 2023", downloadUrl: "#" },
    ]
  },
  "2": {
    name: "Empresa XYZ S.A.",
    contact: "Maria Oliveira",
    email: "maria.oliveira@xyz.com",
    phone: "(21) 9876-1234",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    contract: {
      startDate: "01/03/2023",
      endDate: "28/02/2024",
      value: "R$ 85.000,00",
      status: "Ativo"
    },
    metrics: {
      revenue: "R$ 37.800,00",
      customers: 78,
      tasks: 25,
      completionRate: "92%"
    },
    trends: {
      revenue: 8.7,
      customers: 5.3,
      tasks: 12.1,
      completionRate: 2.5
    },
    monthlyData: [
      { month: "Mar", revenue: 5100, customers: 65 },
      { month: "Abr", revenue: 5300, customers: 68 },
      { month: "Mai", revenue: 5600, customers: 72 },
      { month: "Jun", revenue: 5900, customers: 75 },
      { month: "Jul", revenue: 6200, customers: 78 }
    ],
    productData: [
      { name: "Serviço X", value: 40 },
      { name: "Serviço Y", value: 30 },
      { name: "Serviço Z", value: 20 },
      { name: "Outros", value: 10 }
    ],
    tasksList: [
      { id: "1", task: "Implementação de sistema", status: "Em andamento", dueDate: "25/07/2023", assignee: "Ricardo Alves" },
      { id: "2", task: "Auditoria interna", status: "Pendente", dueDate: "31/07/2023", assignee: "Fernanda Lima" },
      { id: "3", task: "Relatório trimestral", status: "Concluído", dueDate: "10/07/2023", assignee: "Gabriel Santos" }
    ],
    reports: [
      { id: "1", date: "30/06/2023", title: "Relatório Mensal - Junho 2023", downloadUrl: "#" },
      { id: "2", date: "31/05/2023", title: "Relatório Mensal - Maio 2023", downloadUrl: "#" },
      { id: "3", date: "30/04/2023", title: "Relatório Mensal - Abril 2023", downloadUrl: "#" },
      { id: "4", date: "31/03/2023", title: "Relatório Mensal - Março 2023", downloadUrl: "#" }
    ]
  },
  "3": {
    name: "Corporação 123",
    contact: "Roberto Pereira",
    email: "roberto.pereira@corp123.com",
    phone: "(31) 8765-4321",
    address: "Rua da Indústria, 456 - Belo Horizonte, MG",
    contract: {
      startDate: "01/05/2023",
      endDate: "30/04/2024",
      value: "R$ 65.000,00",
      status: "Ativo"
    },
    metrics: {
      revenue: "R$ 18.500,00",
      customers: 42,
      tasks: 16,
      completionRate: "75%"
    },
    trends: {
      revenue: 15.2,
      customers: 10.5,
      tasks: 7.8,
      completionRate: -2.3
    },
    monthlyData: [
      { month: "Mai", revenue: 5500, customers: 35 },
      { month: "Jun", revenue: 6200, customers: 38 },
      { month: "Jul", revenue: 6800, customers: 42 }
    ],
    productData: [
      { name: "Produto Alpha", value: 45 },
      { name: "Produto Beta", value: 35 },
      { name: "Outros", value: 20 }
    ],
    tasksList: [
      { id: "1", task: "Integração de sistemas", status: "Em andamento", dueDate: "20/07/2023", assignee: "Juliana Costa" },
      { id: "2", task: "Análise de mercado", status: "Concluído", dueDate: "05/07/2023", assignee: "André Martins" },
      { id: "3", task: "Desenvolvimento de website", status: "Pendente", dueDate: "10/08/2023", assignee: "Marcelo Dias" },
      { id: "4", task: "Campanha de marketing", status: "Em andamento", dueDate: "15/07/2023", assignee: "Patricia Silva" }
    ],
    reports: [
      { id: "1", date: "30/06/2023", title: "Relatório Mensal - Junho 2023", downloadUrl: "#" },
      { id: "2", date: "31/05/2023", title: "Relatório Mensal - Maio 2023", downloadUrl: "#" },
    ]
  }
};

const Index = () => {
  const [selectedClient, setSelectedClient] = useState(mockClients[0].id);
  const clientData = mockClientData[selectedClient as keyof typeof mockClientData];
  
  const handleSelectClient = (clientId: string) => {
    setSelectedClient(clientId);
  };

  const handleViewReport = (reportId: string) => {
    console.log(`Visualizando relatório ${reportId}`);
    // Lógica para visualizar o relatório
  };

  const tableColumns = [
    { header: "Tarefa", accessorKey: "task" },
    { header: "Status", accessorKey: "status", 
      cell: (value: string) => {
        const colorMap: Record<string, string> = {
          "Concluído": "bg-green-100 text-green-800",
          "Em andamento": "bg-blue-100 text-blue-800",
          "Pendente": "bg-yellow-100 text-yellow-800",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[value] || ""}`}>
            {value}
          </span>
        );
      }
    },
    { header: "Prazo", accessorKey: "dueDate" },
    { header: "Responsável", accessorKey: "assignee" },
  ];
  
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard do Cliente</h1>
          <p className="text-muted-foreground mt-1">
            Visualize e gerencie os dados dos seus clientes
          </p>
        </div>
        <ClientSelector 
          clients={mockClients} 
          selectedClient={selectedClient} 
          onSelectClient={handleSelectClient}
        />
      </header>

      {/* Informações do cliente */}
      <DashboardContainer 
        title="Informações do Cliente" 
        className="mb-8"
        collapsible
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InfoField label="Nome" value={clientData.name} />
            <InfoField label="Contato" value={clientData.contact} />
            <InfoField label="Email" value={clientData.email} />
            <InfoField label="Telefone" value={clientData.phone} />
          </div>
          <div>
            <InfoField label="Endereço" value={clientData.address} />
            <InfoField 
              label="Contrato" 
              value={
                <div>
                  <p>Início: {clientData.contract.startDate}</p>
                  <p>Término: {clientData.contract.endDate}</p>
                  <p>Valor: {clientData.contract.value}</p>
                  <p className="mt-1">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {clientData.contract.status}
                    </span>
                  </p>
                </div>
              } 
            />
          </div>
        </div>
      </DashboardContainer>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Receita Mensal"
          value={clientData.metrics.revenue}
          description="Total do mês atual"
          icon={<DollarSign />}
          trend={{ value: clientData.trends.revenue, isPositive: clientData.trends.revenue > 0 }}
        />
        <MetricCard
          title="Clientes"
          value={clientData.metrics.customers}
          description="Clientes ativos"
          icon={<Users />}
          trend={{ value: clientData.trends.customers, isPositive: clientData.trends.customers > 0 }}
        />
        <MetricCard
          title="Tarefas"
          value={clientData.metrics.tasks}
          description="Tarefas em progresso"
          icon={<ListChecks />}
          trend={{ value: clientData.trends.tasks, isPositive: clientData.trends.tasks > 0 }}
        />
        <MetricCard
          title="Taxa de Conclusão"
          value={clientData.metrics.completionRate}
          description="Média de conclusão"
          icon={<BarChart2 />}
          trend={{ value: clientData.trends.completionRate, isPositive: clientData.trends.completionRate > 0 }}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartContainer
          title="Evolução Mensal"
          type="line"
          data={clientData.monthlyData}
          dataKey="month"
          categories={["revenue", "customers"]}
          colors={["#1E40AF", "#10B981"]}
        />
        <ChartContainer
          title="Distribuição de Produtos"
          type="pie"
          data={clientData.productData}
          dataKey="name"
          categories={["value"]}
        />
      </div>

      {/* Conteúdo em abas */}
      <Tabs defaultValue="tasks" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="tasks">Tarefas</TabsTrigger>
          <TabsTrigger value="reports">Histórico de Relatórios</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          <DashboardContainer title="Lista de Tarefas" onEdit={() => console.log("Editar tarefas")}>
            <DataTable columns={tableColumns} data={clientData.tasksList} />
          </DashboardContainer>
        </TabsContent>
        <TabsContent value="reports">
          <DashboardContainer title="Histórico de Relatórios">
            <ReportHistory reports={clientData.reports} onViewReport={handleViewReport} />
          </DashboardContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
