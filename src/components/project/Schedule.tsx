"use client";

import { useRef, useState, useMemo } from "react";
import { Clock, MapPin, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import scheduleData from "@/data/schedule.json" assert { type: "json" };

interface ScheduleActivity {
  titulo: string;
  horario: string;
  local: string;
  palestrante: string;
  vagas: string;
  meetLink?: string;
}

interface Event {
  id: string;
  name: string;
  talks: ScheduleActivity[];
}

interface DaySchedule {
  date: string;
  dayOfWeek: string;
  events: Event[];
}

// Cores temáticas para cada eixo temático - Paleta única e contrastante
const eventColors: Record<string, { primary: string; secondary: string; accent: string; text: string }> = {
  "Encontro Estadual das Licenciaturas da Unitins": {
    primary: "bg-blue-600",         // Azul
    secondary: "bg-blue-50",
    accent: "border-blue-500",
    text: "text-blue-700"
  },
  "XXXII Jornada de iniciação científica": {
    primary: "bg-emerald-600",      // Verde esmeralda
    secondary: "bg-emerald-50",
    accent: "border-emerald-500",
    text: "text-emerald-700"
  },
  "Embrapa": {
    primary: "bg-green-700",        // Verde escuro
    secondary: "bg-green-50",
    accent: "border-green-600",
    text: "text-green-800"
  },
  "Seminário Estadual de Educação em Direitos Humanos: Prevenir para Proteger: A Universidade como Território de Direitos": {
    primary: "bg-indigo-600",       // Índigo (azul escuro)
    secondary: "bg-indigo-50",
    accent: "border-indigo-500",
    text: "text-indigo-700"
  },
  "Apresentação cultural": {
    primary: "bg-rose-600",         // Rosa
    secondary: "bg-rose-50",
    accent: "border-rose-500",
    text: "text-rose-700"
  },
  "III SCTI": {
    primary: "bg-red-600",          // Vermelho
    secondary: "bg-red-50",
    accent: "border-red-500",
    text: "text-red-700"
  },
  "I Semana Acadêmica das Agrárias - UNITINS/Tema IntegraAGRO: Cultivando Conhecimento Para o Campo": {
    primary: "bg-lime-600",         // Lima
    secondary: "bg-lime-50",
    accent: "border-lime-500",
    text: "text-lime-700"
  },
  "IX Colóquio Interdisciplinar de Ensino, Pesquisa e Extensão": {
    primary: "bg-sky-600",          // Azul céu
    secondary: "bg-sky-50",
    accent: "border-sky-500",
    text: "text-sky-700"
  },
  "III Circuito de Inovação": {
    primary: "bg-purple-600",       // Roxo
    secondary: "bg-purple-50",
    accent: "border-purple-500",
    text: "text-purple-700"
  },
  "FAPT": {
    primary: "bg-amber-700",        // Âmbar escuro
    secondary: "bg-amber-50",
    accent: "border-amber-600",
    text: "text-amber-800"
  },
  "Projeto Integrador curso de Gestão Pública - TO Graduado": {
    primary: "bg-fuchsia-600",      // Fúcsia
    secondary: "bg-fuchsia-50",
    accent: "border-fuchsia-500",
    text: "text-fuchsia-700"
  },
  "I Fórum de Gestão dos Grupos de Pesquisa": {
    primary: "bg-cyan-600",         // Ciano
    secondary: "bg-cyan-50",
    accent: "border-cyan-500",
    text: "text-cyan-700"
  },
  "II Colóquio de Extensão – TO Graduado": {
    primary: "bg-orange-600",       // Laranja
    secondary: "bg-orange-50",
    accent: "border-orange-500",
    text: "text-orange-700"
  },
  "Mudanças Climáticas e seus Desdobramentos: Educação Climática, Sustentabilidade, Tecnologia e Saberes Interdisciplinares": {
    primary: "bg-teal-600",         // Verde-azulado
    secondary: "bg-teal-50",
    accent: "border-teal-500",
    text: "text-teal-700"
  },
  "I Congresso de Direito, Processo e Tecnologia da Unitins": {
    primary: "bg-slate-600",        // Ardósia (cinza azulado)
    secondary: "bg-slate-50",
    accent: "border-slate-500",
    text: "text-slate-700"
  },
  "Jornada Acadêmica dos Cursos de Sistemas de Informação e Tecnologia em Análise e Desenvolvimento de Sistemas e Encontro de Egressos do Curso de Sistemas de Informação": {
    primary: "bg-pink-600",         // Rosa vibrante
    secondary: "bg-pink-50",
    accent: "border-pink-500",
    text: "text-pink-700"
  },
  "Lançamento da revista e premiações da JIC, NIT, Colóquio e TO Graduado": {
    primary: "bg-yellow-600",       // Amarelo
    secondary: "bg-yellow-50",
    accent: "border-yellow-500",
    text: "text-yellow-700"
  }
};

const getEventColors = (eventName: string) => {
  return eventColors[eventName] || {
    primary: "bg-primary",
    secondary: "bg-primary/5",
    accent: "border-primary",
    text: "text-primary"
  };
};

// Mapeia datas em português para formato DD/MM
const dateMapping: Record<string, { date: string; dayOfWeek: string }> = {
  "2025-10-20": { date: "20/10", dayOfWeek: "Segunda-feira" },
  "2025-10-21": { date: "21/10", dayOfWeek: "Terça-feira" },
  "2025-10-22": { date: "22/10", dayOfWeek: "Quarta-feira" },
  "2025-10-23": { date: "23/10", dayOfWeek: "Quinta-feira" },
  "2025-10-24": { date: "24/10", dayOfWeek: "Sexta-feira" },
};

export default function Schedule() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, margin: "-100px" });
  const formatLastUpdate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  };

  const schedule: DaySchedule[] = useMemo(() => {
    const transformedSchedule: DaySchedule[] = [];


    const allDaysEvents: Record<string, ScheduleActivity[]> = {};
    if (scheduleData["Todos os dias"]) {
      Object.entries(scheduleData["Todos os dias"]).forEach(([eventName, activities]) => {
        allDaysEvents[eventName] = activities as ScheduleActivity[];
      });
    }

    Object.entries(scheduleData).forEach(([dateKey, dayData]) => {
      if (dateKey === "Todos os dias") return;

      const dateInfo = dateMapping[dateKey];
      if (!dateInfo) return;

      const eventsByName: Record<string, ScheduleActivity[]> = {};

      Object.entries(dayData).forEach(([eventName, activities]) => {
        if (!eventsByName[eventName]) {
          eventsByName[eventName] = [];
        }
        eventsByName[eventName].push(...(activities as ScheduleActivity[]));
      });

      Object.entries(allDaysEvents).forEach(([eventName, activities]) => {
        if (!eventsByName[eventName]) {
          eventsByName[eventName] = [];
        }
        eventsByName[eventName].push(...activities);
      });

      const events: Event[] = [];
      let eventIdCounter = 1;

      const getPriority = (eventName: string): number => {
        if (eventName === "III Circuito de Inovação") return 0; // Sempre primeiro
        return 1; // Outros eventos
      };

      // Ordena os eventos: Circuito de Inovação primeiro, depois os demais em ordem alfabética
      const sortedEntries = Object.entries(eventsByName).sort(([nameA], [nameB]) => {
        const priorityA = getPriority(nameA);
        const priorityB = getPriority(nameB);

        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }
        return nameA.localeCompare(nameB);
      });

      sortedEntries.forEach(([eventName, activities]) => {
        events.push({
          id: `event-${dateInfo.date}-${eventIdCounter++}`,
          name: eventName,
          talks: activities,
        });
      });

      transformedSchedule.push({
        date: dateInfo.date,
        dayOfWeek: dateInfo.dayOfWeek,
        events,
      });
    });

    return transformedSchedule;
  }, []);

  // Estado para o dia selecionado (primeiro dia por padrão)
  const [selectedDay, setSelectedDay] = useState<string | null>(schedule[0]?.date || null);

  // Filtra os eventos baseado no dia selecionado
  const filteredSchedule = selectedDay
    ? schedule.filter((day) => day.date === selectedDay)
    : [];

  // Visualização: por eixo (agrupada) ou por dia (cronológica)
  const [viewMode, setViewMode] = useState<"grouped" | "daily">("grouped");

  // Parser para horário (minutos desde 00:00)
  const parseStartMinutes = (horario: string): number => {
    try {
      const startPart = horario.split("-")[0].trim();
      const [hoursStr, minutesStr] = startPart.split("h");
      const hours = parseInt(hoursStr, 10);
      const minutes = minutesStr ? parseInt(minutesStr, 10) : 0;
      if (Number.isNaN(hours)) return Number.POSITIVE_INFINITY;
      return hours * 60 + (Number.isNaN(minutes) ? 0 : minutes);
    } catch {
      return Number.POSITIVE_INFINITY;
    }
  };

  return (
    <section id="programacao" className="w-full py-16 sm:py-20 px-4 relative overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header com Elemento Visual */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          <div ref={headerRef} className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 font-montserrat">
              Programação
            </h2>
            <div className="flex justify-center lg:justify-start">
              <motion.div
                className="h-1 bg-primary rounded-full"
                initial={{ width: "4rem" }}
                animate={{
                  width: isHeaderInView ? "12rem" : "4rem"
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                aria-hidden="true"
              />
            </div>
            <p className="text-muted-foreground/70 font-poppins text-xs sm:text-sm mt-2 italic flex items-center justify-center lg:justify-start gap-1.5">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span>Atualizado em: {formatLastUpdate(scheduleData.lastUpdate)}</span>
            </p>
            <div className="mt-4 flex items-center gap-2 justify-center lg:justify-start" role="group" aria-label="Alternar visualização da programação">
              <Button
                variant={viewMode === "grouped" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grouped")}
                aria-pressed={viewMode === "grouped"}
                className={`
      transition-all duration-300 rounded-xl
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
      ${viewMode === "grouped"
                    ? 'shadow-md'
                    : 'text-primary border-primary hover:border-primary hover:bg-primary/10 hover:shadow-sm hover:text-primary'
                  }
    `}
              >
                Por eixo
              </Button>

              <Button
                variant={viewMode === "daily" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("daily")}
                aria-pressed={viewMode === "daily"}
                className={`
      transition-all duration-300 rounded-xl
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
      ${viewMode === "daily"
                    ? 'shadow-md'

                    : 'text-primary border-primary hover:border-primary hover:bg-primary/10 hover:shadow-sm hover:text-primary'
                  }
    `}
              >
                Por horário
              </Button>
            </div>
          </div>

          {/* Elemento Visual */}
          <div className="hidden lg:flex items-center justify-end relative w-full max-w-xs aspect-square">
            <Image
              src="/ilustracoes/2_ilustracao.png"
              alt="Elemento decorativo da identidade visual"
              fill
              sizes="(max-width: 1024px) 0px, 320px"
              className="object-contain drop-shadow-2xl animate-float-delayed"
            />
          </div>
        </div>

        {/* Filtro de Dias */}
        <div
          className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 flex-wrap"
          role="group"
          aria-label="Filtrar programação por dia"
        >
          {schedule.map((day) => {
            const isActive = selectedDay === day.date;
            return (
              <Button
                key={day.date}
                variant={isActive ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedDay(day.date)}
                className={`
                  w-[120px] sm:w-[140px] h-[80px] sm:h-[90px] py-3 sm:py-4 px-4 sm:px-6 
                  flex flex-col items-center justify-center gap-1 
                  transition-all duration-300 rounded-xl text-center
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                  ${isActive
                    ? 'shadow-md'
                    : 'hover:border-primary hover:bg-primary/10 hover:shadow-sm hover:text-primary'
                  }
                `}
                aria-pressed={isActive}
                aria-label={`Selecionar ${day.dayOfWeek}, ${day.date}`}
              >
                <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-opacity ${isActive ? 'opacity-90' : 'opacity-70'}`}>
                  {day.dayOfWeek}
                </span>
                <span className="text-xl sm:text-2xl font-bold">
                  {day.date}
                </span>
              </Button>
            );
          })}
        </div>

        {/* Lista de Eventos */}
        {filteredSchedule.length > 0 ? (
          <div className="space-y-6 sm:space-y-8">
            {filteredSchedule.map((day) => (
              <div key={day.date}>
                {/* Título do Dia */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-primary inline-block font-montserrat">
                    {day.date}
                  </h3>
                  <span className="text-muted-foreground ml-2 sm:ml-3 text-sm sm:text-base">
                    {day.dayOfWeek}
                  </span>
                </div>

                {/* Cards de Eventos / Visualização */}
                {viewMode === "grouped" ? (
                  <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                    {day.events.map((event) => {
                      const colors = getEventColors(event.name);
                      return (
                        <AccordionItem
                          key={event.id}
                          value={event.id}
                          className={`border-none rounded-xl overflow-hidden ${colors.secondary}`}
                        >
                          <Card className={`border-l-4 ${colors.accent} hover:shadow-lg transition-all duration-300 bg-transparent`}>
                            <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]_.chevron]:rotate-180 [&>svg]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
                              <CardHeader className={`py-4 sm:py-5 px-4 sm:px-6 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 sm:space-y-0`}>
                                <CardTitle className={`text-base sm:text-lg font-semibold ${colors.text} text-left pr-2 sm:pr-4 font-montserrat leading-snug`}>
                                  {event.name}
                                </CardTitle>
                                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto justify-end">
                                  <span className={`text-xs text-white ${colors.primary} px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium shadow-sm min-w-[90px] sm:min-w-[110px] text-center`}>
                                    {event.talks.length} {event.talks.length === 1 ? "atividade" : "atividades"}
                                  </span>
                                  <svg
                                    className={`chevron w-5 h-5 ${colors.text} transition-transform duration-200 flex-shrink-0`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </CardHeader>
                            </AccordionTrigger>

                            <AccordionContent>
                              <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6 space-y-2 sm:space-y-3">
                                {event.talks.map((talk, index) => (
                                  <div
                                    key={`${event.id}-talk-${index}`}
                                    className={`flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border ${colors.accent} hover:shadow-md transition-all duration-300`}
                                  >
                                    {/* Conteúdo Principal */}
                                    <div className="flex-1 min-w-0 w-full space-y-2">
                                      <h5 className="font-semibold text-foreground text-sm sm:text-base font-montserrat leading-tight">
                                        {talk.titulo}
                                      </h5>
                                      {talk.palestrante !== "" && (
                                        <p className="text-xs sm:text-sm text-muted-foreground font-poppins">
                                          <strong>Palestrante:</strong> {talk.palestrante}
                                        </p>
                                      )}
                                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
                                        <div className="flex items-center gap-2">
                                          <MapPin className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.text} flex-shrink-0`} aria-hidden="true" />
                                          <span>{talk.local}</span>
                                          {talk.meetLink && (
                                            <a
                                              href={talk.meetLink}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-primary hover:underline inline-flex items-center gap-1 text-xs sm:text-sm font-medium"
                                            >
                                              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
                                              Acessar Meet
                                            </a>
                                          )}
                                        </div>
                                        {talk.vagas !== "Ilimitado" && talk.vagas !== "Não especificado" && talk.vagas !== "" && (
                                          <div className="flex items-center gap-2">
                                            <Users className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.text} flex-shrink-0`} aria-hidden="true" />
                                            <span>{talk.vagas} vagas</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Horário */}
                                    <div className="flex-shrink-0 w-full sm:w-auto">
                                      <div className={`flex items-center gap-1.5 ${colors.text} font-medium ${colors.secondary} px-3 py-2 rounded-lg border ${colors.accent} justify-center sm:justify-end`}>
                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
                                        <span className="text-xs sm:text-sm whitespace-nowrap">{talk.horario}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </CardContent>
                            </AccordionContent>
                          </Card>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {day.events
                      .flatMap((event) =>
                        event.talks.map((talk, idx) => ({
                          talk,
                          eventName: event.name,
                          eventId: event.id,
                          order: idx,
                          start: parseStartMinutes(talk.horario),
                        }))
                      )
                      .sort((a, b) => (a.start !== b.start ? a.start - b.start : a.order - b.order))
                      .map((item, i) => {
                        const colors = getEventColors(item.eventName);
                        return (
                          <div
                            key={`${item.eventId}-daily-${i}`}
                            className={`flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border ${colors.accent} hover:shadow-md transition-all duration-300`}
                          >
                            <div className="flex-1 min-w-0 w-full space-y-2">
                              <div className="flex items-center justify-start gap-2">
                                <h5 className="font-semibold text-foreground text-sm sm:text-base font-montserrat leading-tight">
                                  {item.talk.titulo}
                                </h5>
                              </div>
                              {item.talk.palestrante !== "" && (
                                <p className="text-xs sm:text-sm text-muted-foreground font-poppins">
                                  <strong>Palestrante:</strong> {item.talk.palestrante}
                                </p>
                              )}
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
                                <div className="flex items-center gap-2">
                                  <MapPin className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.text} flex-shrink-0`} aria-hidden="true" />
                                  <span>{item.talk.local}</span>
                                  {item.talk.meetLink && (
                                    <a
                                      href={item.talk.meetLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline inline-flex items-center gap-1 text-xs sm:text-sm font-medium"
                                    >
                                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
                                      Acessar Meet
                                    </a>
                                  )}
                                </div>
                                {item.talk.vagas !== "Ilimitado" && item.talk.vagas !== "Não especificado" && item.talk.vagas !== "" && (
                                  <div className="flex items-center gap-2">
                                    <Users className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.text} flex-shrink-0`} aria-hidden="true" />
                                    <span>{item.talk.vagas} vagas</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex-shrink-0 w-full sm:w-auto">
                              <div className={`flex items-center gap-1.5 ${colors.text} font-medium ${colors.secondary} px-3 py-2 rounded-lg border ${colors.accent} justify-center sm:justify-end`}>
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
                                <span className="text-xs sm:text-sm whitespace-nowrap">{item.talk.horario}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Mensagem quando nenhum dia está selecionado */}
            <div
              className="text-center mt-8 sm:mt-12 p-6 sm:p-8 border-2 border-dashed border-border rounded-lg"
              role="status"
              aria-live="polite"
            >
              <p className="text-muted-foreground text-base sm:text-lg mb-2 font-poppins">
                Selecione um dia acima
              </p>
              <p className="text-muted-foreground text-sm font-poppins">
                Clique em um dos cards para visualizar a programação
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
