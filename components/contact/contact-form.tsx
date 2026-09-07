"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const sectors = ["Industrial", "Oil & Gas", "Textil", "Mantenimiento", "Otro"];

export function ContactForm({
  defaultNecesidad,
}: {
  defaultNecesidad?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contacto", { method: "POST", body: data });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      setMessage(
        "Recibimos tu operación. Un asesor técnico validará la información antes de recomendar una referencia."
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage("No pudimos enviar el formulario. Escríbanos por WhatsApp o al correo.");
    }
  }

  const field =
    "h-11 rounded-2xl border-border bg-white px-3 text-sm md:text-sm";

  return (
    <form onSubmit={onSubmit} className="surface-card grid gap-4 p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="nombre">Nombre</Label>
          <Input id="nombre" name="nombre" required className={field} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="empresa">Empresa</Label>
          <Input id="empresa" name="empresa" required className={field} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="cargo">Cargo</Label>
          <Input id="cargo" name="cargo" className={field} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input id="telefono" name="telefono" required className={field} />
        </div>
        <div className="grid gap-1.5 sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className={field} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="sector">Sector</Label>
          <select
            id="sector"
            name="sector"
            required
            className={`${field} text-foreground`}
            defaultValue=""
          >
            <option value="" disabled>
              Seleccione
            </option>
            {sectors.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="necesidad">Necesidad</Label>
          <Input
            id="necesidad"
            name="necesidad"
            required
            className={field}
            defaultValue={defaultNecesidad}
          />
        </div>
        <div className="grid gap-1.5 sm:col-span-2">
          <Label htmlFor="mensaje">Mensaje</Label>
          <Textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            className="min-h-28 rounded-2xl border-border bg-white"
          />
        </div>
        <div className="grid gap-1.5 sm:col-span-2">
          <Label htmlFor="archivo">Adjuntar ficha, fotografía o especificación</Label>
          <Input
            id="archivo"
            name="archivo"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
            className="h-auto py-2"
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={status === "sending"}
        className="h-12 rounded-2xl px-6"
      >
        {status === "sending" ? "Enviando…" : "Hablemos de tu operación"}
      </Button>
      {message && (
        <p
          className={
            status === "ok" ? "text-sm text-primary" : "text-sm text-destructive"
          }
        >
          {message}
        </p>
      )}
    </form>
  );
}
