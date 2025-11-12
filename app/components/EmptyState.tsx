import { Button } from "@/components/ui/button";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import shared from "@/app/styles/shared.module.css";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className={shared.emptyState}>
      <Icon className={shared.emptyIcon} />
      <h2 className={shared.emptyTitle}>{title}</h2>
      <p className={shared.emptyDescription}>{description}</p>
      {action ? (
        <Button asChild size="lg" className={shared.shopButton}>
          <Link href={action.href}>{action.label}</Link>
        </Button>
      ) : null}
    </div>
  );
}
