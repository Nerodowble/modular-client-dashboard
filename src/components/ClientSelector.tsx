
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface Client {
  id: string;
  name: string;
}

interface ClientSelectorProps {
  clients: Client[];
  selectedClient: string;
  onSelectClient: (clientId: string) => void;
}

const ClientSelector = ({ clients, selectedClient, onSelectClient }: ClientSelectorProps) => {
  return (
    <div className="w-full md:w-72">
      <Select value={selectedClient} onValueChange={onSelectClient}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um cliente" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ClientSelector;
