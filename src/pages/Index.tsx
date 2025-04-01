
import React, { useState } from 'react';
import { 
  Users, 
  UserCheck,
  Database, 
  Activity,
  BarChart2,
  CalendarDays,
  ChartLine,
  ChartPie
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
      endDate: "31/12/2025",
      status: "Ativo"
    },
    metrics: {
      activeUsers: 126,
      loggedUsers2025: 98,
      samlCompanies: 3,
      standardsCount: 287
    },
    trends: {
      activeUsers: 8.2,
      loggedUsers2025: 15.7,
      samlCompanies: 0,
      standardsCount: 12.3
    },
    contractedBases: [
      "Base Regulatória Nacional",
      "Base de Compliance",
      "Base Internacional",
      "Base Setorial Financeira"
    ],
    contractedProducts: [
      { name: "meta.platform", status: "Ativo", usageLevel: "Alto" },
      { name: "flow.platform", status: "Ativo", usageLevel: "Médio" },
      { name: "radar.platform", status: "Ativo", usageLevel: "Alto" },
      { name: "search.platform", status: "Inativo", usageLevel: "Baixo" },
      { name: "export_archer", status: "Ativo", usageLevel: "Médio" },
      { name: "llm_gpt.platform", status: "Ativo", usageLevel: "Alto" },
      { name: "data_quality_monitor", status: "Ativo", usageLevel: "Médio" }
    ],
    standardsData: [
      { type: "Pré-Normativos", count: 124 },
      { type: "Normativos", count: 98 },
      { type: "Pós-Normativos", count: 65 }
    ],
    userActivityData: [
      { month: "Jan", active: 95, logged: 82 },
      { month: "Fev", active: 100, logged: 85 },
      { month: "Mar", active: 105, logged: 90 },
      { month: "Abr", active: 110, logged: 87 },
      { month: "Mai", active: 115, logged: 92 },
      { month: "Jun", active: 120, logged: 94 },
      { month: "Jul", active: 126, logged: 98 }
    ],
    productUsageData: [
      { name: "meta.platform", value: 35 },
      { name: "flow.platform", value: 15 },
      { name: "radar.platform", value: 25 },
      { name: "search.platform", value: 5 },
      { name: "export_archer", value: 5 },
      { name: "llm_gpt.platform", value: 10 },
      { name: "data_quality_monitor", value: 5 }
    ],
    associatedAreas: [
      { id: "1", area: "Jurídico", usersCount: 15 },
      { id: "2", area: "Compliance", usersCount: 8 },
      { id: "3", area: "Riscos", usersCount: 12 },
      { id: "4", area: "Auditoria", usersCount: 5 }
    ],
    taxonomies: [
      { id: "1", name: "Taxonomia de Riscos", categoriesCount: 25 },
      { id: "2", name: "Taxonomia de Controles", categoriesCount: 18 },
      { id: "3", name: "Taxonomia Regulatória", categoriesCount: 32 }
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
      endDate: "28/02/2025",
      status: "Ativo"
    },
    metrics: {
      activeUsers: 78,
      loggedUsers2025: 65,
      samlCompanies: 1,
      standardsCount: 142
    },
    trends: {
      activeUsers: 5.3,
      loggedUsers2025: 7.8,
      samlCompanies: 0,
      standardsCount: 4.2
    },
    contractedBases: [
      "Base Regulatória Nacional",
      "Base de Compliance"
    ],
    contractedProducts: [
      { name: "meta.platform", status: "Ativo", usageLevel: "Alto" },
      { name: "flow.platform", status: "Ativo", usageLevel: "Alto" },
      { name: "radar.platform", status: "Inativo", usageLevel: "Baixo" },
      { name: "search.platform", status: "Ativo", usageLevel: "Médio" }
    ],
    standardsData: [
      { type: "Pré-Normativos", count: 62 },
      { type: "Normativos", count: 45 },
      { type: "Pós-Normativos", count: 35 }
    ],
    userActivityData: [
      { month: "Mar", active: 65, logged: 58 },
      { month: "Abr", active: 68, logged: 60 },
      { month: "Mai", active: 72, logged: 63 },
      { month: "Jun", active: 75, logged: 64 },
      { month: "Jul", active: 78, logged: 65 }
    ],
    productUsageData: [
      { name: "meta.platform", value: 45 },
      { name: "flow.platform", value: 35 },
      { name: "radar.platform", value: 5 },
      { name: "search.platform", value: 15 }
    ],
    associatedAreas: [
      { id: "1", area: "Jurídico", usersCount: 25 },
      { id: "2", area: "Compliance", usersCount: 18 },
      { id: "3", area: "Riscos", usersCount: 10 }
    ],
    taxonomies: [
      { id: "1", name: "Taxonomia de Riscos", categoriesCount: 20 },
      { id: "2", name: "Taxonomia Regulatória", categoriesCount: 15 }
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
      endDate: "30/04/2025",
      status: "Ativo"
    },
    metrics: {
      activeUsers: 42,
      loggedUsers2025: 38,
      samlCompanies: 0,
      standardsCount: 95
    },
    trends: {
      activeUsers: 10.5,
      loggedUsers2025: 12.2,
      samlCompanies: 0,
      standardsCount: 8.7
    },
    contractedBases: [
      "Base Regulatória Nacional"
    ],
    contractedProducts: [
      { name: "meta.platform", status: "Ativo", usageLevel: "Médio" },
      { name: "flow.platform", status: "Inativo", usageLevel: "Baixo" },
      { name: "radar.platform", status: "Ativo", usageLevel: "Alto" }
    ],
    standardsData: [
      { type: "Pré-Normativos", count: 42 },
      { type: "Normativos", count: 38 },
      { type: "Pós-Normativos", count: 15 }
    ],
    userActivityData: [
      { month: "Mai", active: 35, logged: 30 },
      { month: "Jun", active: 38, logged: 32 },
      { month: "Jul", active: 42, logged: 38 }
    ],
    productUsageData: [
      { name: "meta.platform", value: 35 },
      { name: "flow.platform", value: 10 },
      { name: "radar.platform", value: 55 }
    ],
    associatedAreas: [
      { id: "1", area: "Jurídico", usersCount: 22 },
      { id: "2", area: "Compliance", usersCount: 20 }
    ],
    taxonomies: [
      { id: "1", name: "Taxonomia de Riscos", categoriesCount: 18 },
      { id: "2", name: "Taxonomia Regulatória", categoriesCount: 12 }
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

  // Tabela de produtos contratados
  const productsColumns = [
    { header: "Produto", accessorKey: "name" },
    { header: "Status", accessorKey: "status", 
      cell: (value: string) => {
        const colorMap: Record<string, string> = {
          "Ativo": "bg-green-100 text-green-800",
          "Inativo": "bg-red-100 text-red-800",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[value] || ""}`}>
            {value}
          </span>
        );
      }
    },
    { header: "Nível de Uso", accessorKey: "usageLevel", 
      cell: (value: string) => {
        const colorMap: Record<string, string> = {
          "Alto": "bg-blue-100 text-blue-800",
          "Médio": "bg-yellow-100 text-yellow-800",
          "Baixo": "bg-gray-100 text-gray-800",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[value] || ""}`}>
            {value}
          </span>
        );
      }
    },
  ];

  // Tabela de áreas associadas
  const areasColumns = [
    { header: "Área", accessorKey: "area" },
    { header: "Qtd. Usuários", accessorKey: "usersCount" },
  ];

  // Tabela de taxonomias
  const taxonomiesColumns = [
    { header: "Taxonomia", accessorKey: "name" },
    { header: "Qtd. Categorias", accessorKey: "categoriesCount" },
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
          title="Usuários Ativos"
          value={clientData.metrics.activeUsers}
          description="Total atual"
          icon={<Users />}
          trend={{ value: clientData.trends.activeUsers, isPositive: clientData.trends.activeUsers > 0 }}
        />
        <MetricCard
          title="Usuários Logados (2025)"
          value={clientData.metrics.loggedUsers2025}
          description="No ano atual"
          icon={<UserCheck />}
          trend={{ value: clientData.trends.loggedUsers2025, isPositive: clientData.trends.loggedUsers2025 > 0 }}
        />
        <MetricCard
          title="Empresas com SAML"
          value={clientData.metrics.samlCompanies}
          description="Integração ativa"
          icon={<Activity />}
          trend={{ value: clientData.trends.samlCompanies, isPositive: clientData.trends.samlCompanies > 0 }}
        />
        <MetricCard
          title="Normativos"
          value={clientData.metrics.standardsCount}
          description="Total"
          icon={<Database />}
          trend={{ value: clientData.trends.standardsCount, isPositive: clientData.trends.standardsCount > 0 }}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartContainer
          title="Atividade de Usuários"
          type="line"
          data={clientData.userActivityData}
          dataKey="month"
          categories={["active", "logged"]}
          colors={["#1E40AF", "#10B981"]}
        />
        <ChartContainer
          title="Distribuição de Uso por Produto"
          type="pie"
          data={clientData.productUsageData}
          dataKey="name"
          categories={["value"]}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartContainer
          title="Distribuição de Normativos"
          type="bar"
          data={clientData.standardsData}
          dataKey="type"
          categories={["count"]}
          colors={["#8B5CF6"]}
        />
      </div>

      {/* Bases Contratadas */}
      <DashboardContainer title="Bases Contratadas" className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {clientData.contractedBases.map((base, index) => (
            <div 
              key={index} 
              className="p-4 border rounded-lg bg-blue-50 border-blue-200 text-center"
            >
              <Database className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p>{base}</p>
            </div>
          ))}
        </div>
      </DashboardContainer>

      {/* Conteúdo em abas */}
      <Tabs defaultValue="products" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="areas">Áreas</TabsTrigger>
          <TabsTrigger value="taxonomies">Taxonomias</TabsTrigger>
          <TabsTrigger value="reports">Histórico de Relatórios</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <DashboardContainer title="Produtos Contratados">
            <DataTable columns={productsColumns} data={clientData.contractedProducts} />
          </DashboardContainer>
        </TabsContent>
        <TabsContent value="areas">
          <DashboardContainer title="Áreas Associadas">
            <DataTable columns={areasColumns} data={clientData.associatedAreas} />
          </DashboardContainer>
        </TabsContent>
        <TabsContent value="taxonomies">
          <DashboardContainer title="Taxonomias Associadas">
            <DataTable columns={taxonomiesColumns} data={clientData.taxonomies} />
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
