"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DistrictSelectorProps {
  districts: string[];
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
}

export function DistrictSelector({
  districts = [],
  selectedDistrict,
  onDistrictChange,
}: DistrictSelectorProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedDistrict || "Select district..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search district..." />
          <CommandEmpty>No district found.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto">
            {Array.isArray(districts) && districts.map((district) => (
              <CommandItem
                key={district}
                value={district}
                onSelect={() => {
                  onDistrictChange(district);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedDistrict === district ? "opacity-100" : "opacity-0"
                  )}
                />
                {district}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}