"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { PlusIcon, Cross2Icon } from "@radix-ui/react-icons";

interface DynamicListInputProps {
  label: string;
  items: string[];
  onItemsChange: (items: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  addButtonText?: string;
  emptyStateText?: string;
  className?: string;
}

export default function DynamicListInput({
  label,
  items,
  onItemsChange,
  placeholder = "Add item...",
  maxItems,
  addButtonText = "Add",
  emptyStateText,
  className = "",
}: DynamicListInputProps) {
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    if (!newItem.trim()) return;
    if (maxItems && items.length >= maxItems) return;

    onItemsChange([...items, newItem.trim()]);
    setNewItem("");
  };

  const handleRemove = (index: number) => {
    onItemsChange(items.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const canAddMore = !maxItems || items.length < maxItems;

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium">{label}</label>

      {/* List of existing items */}
      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-default-50 rounded-lg border border-default-200 group hover:border-primary/50 transition-colors"
            >
              <span className="flex-1 text-sm">{item}</span>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onPress={() => handleRemove(index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Cross2Icon className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {items.length === 0 && emptyStateText && (
        <div className="p-6 text-center border-2 border-dashed border-default-200 rounded-lg">
          <p className="text-sm text-default-500">{emptyStateText}</p>
        </div>
      )}

      {/* Add new item input */}
      {canAddMore && (
        <div className="flex gap-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            classNames={{
              input: "text-sm",
              inputWrapper: "h-12",
            }}
          />
          <Button
            onPress={handleAdd}
            color="primary"
            variant="flat"
            className="h-12 px-6"
            startContent={<PlusIcon className="w-4 h-4" />}
          >
            {addButtonText}
          </Button>
        </div>
      )}

      {maxItems && (
        <p className="text-xs text-default-500">
          {items.length} / {maxItems} items
        </p>
      )}
    </div>
  );
}
