import React, { useState, useEffect, useRef } from "react";
import { 
  Calendar, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  MessageSquare, 
  Plus, 
  Trash2, 
  BookOpen, 
  Users, 
  Brain, 
  ChevronRight, 
  Send, 
  Copy, 
  FileText, 
  Award, 
  Play, 
  Pause, 
  RotateCcw, 
  Heart, 
  TrendingUp,
  BarChart,
  Grid
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Task, GoalBreakdown, ChatMessage } from "./types";

// Injected default mock tasks for high-value immediate presentation
const DEFAULT_TASKS: Task[] = [
  {
    id: "1",
    title: "CS302: Compiler Design Construction Project",
    courseOrOrg: "CS302 Compiler Design",
    type: "academic",
    deadline: getRelativeDateString(4),
    estimatedHours: 12,
    description: "Construct intermediate code representation and basic AST structures.",
    status: "in_progress",
    priority: "high"
  },
  {
    id: "2",
    title: "Campus Senate Legislative Budget Sync",
    courseOrOrg: "Student Senate Organization",
    type: "campus_org",
    deadline: getRelativeDateString(1),
    estimatedHours: 2,
    description: "Align club event funding balances for next semester allocations.",
    status: "pending",
    priority: "medium"
  },
  {
    id: "3",
    title: "Biochemistry Chromatography Final Lab Draft",
    courseOrOrg: "CHEM305 Biochemistry I",
    type: "academic",
    deadline: getRelativeDateString(3),
    estimatedHours: 8,
    description: "Summarize findings and print final chromatography plate visuals.",
    status: "pending",
    priority: "high"
  },
  {
    id: "4",
    title: "Student Tech Gala Venue Setup",
    courseOrOrg: "CS Club Committee",
    type: "campus_org",
    deadline: getRelativeDateString(2),
    estimatedHours: 3,
    description: "Arrange student lounge tables and hook up virtual projector feed.",
    status: "completed",
    priority: "low"
  }
];

const DEFAULT_CHAT: ChatMessage[] = [
  {
    id: "m1",
    sender: "mentor",
    text: "Welcome, Scholar! I'm **Aegis**, your educational mentor. Procrastination is just anxiety in disguise. Let's deconstruct your syllabus together, resolve club meeting overlaps, and carve out comfortable focus slots. How are you feeling about your academic workload today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const MOTIVATIONAL_QUOTES = [
  "\"The secret of getting ahead is getting started. Let's make our activation energy as close to zero as possible.\" — Aegis Coaching",
  "\"You don't have to build the whole final project today. Just write the first five comment lines.\" — Executive Function Support",
  "\"Guilt-free play requires protected study pockets. Shield your calendar to enjoy your campus club later!\" — Digital Mentor",
  "\"Procrastination is merely a call for calmer, smaller action steps. Let's lower the pressure.\" — Dr. Aegis, Digital Mentor"
];

const MOCK_SYLLABUS_TEMPLATES = {
  academic: `CS381 Artificial Intelligence Syllabus:
1. Programming Lab 2: Build a basic Q-Learning framework. Due in 5 days. High density coding, expected workload: 14 hours.
2. Written Midterm Exam preparation: Review Markov Decision Processes. Test is in 7 days. High importance.`,
  club: `Student Senate - Association of Engineering:
1. Executive Council Board Meeting: Wednesday at 6 PM. Focus on semester budget voting. Workload: 2 hours sync.
2. Winter Showcase Gala Planning Session: Wednesday at 8 PM. General volunteer briefing. Workload: 1 hour sync.`
};

function getRelativeDateString(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split("T")[0];
}

export default function App() {
  // State
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [activeTab, setActiveTab] = useState<'calendar' | 'goal' | 'chat'>('calendar');
  
  // Custom Task addition
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCourse, setNewTaskCourse] = useState("");
  const [newTaskType, setNewTaskType] = useState<'academic' | 'campus_org'>('academic');
  const [newTaskDeadline, setNewTaskDeadline] = useState(getRelativeDateString(2));
  const [newTaskHours, setNewTaskHours] = useState(3);
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Syllabus Parsing States
  const [parseText, setParseText] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  // Goal Breakdown States
  const [goalTitle, setGoalTitle] = useState("Build & Deploy Compiler Design AST Engine");
  const [daysCount, setDaysCount] = useState(5);
  const [isBreakingDown, setIsBreakingDown] = useState(false);
  const [generatedBreakdown, setGeneratedBreakdown] = useState<GoalBreakdown | null>({
    id: "g1",
    goalTitle: "Build & Deploy Compiler Design AST Engine",
    targetDate: getRelativeDateString(5),
    milestones: [
      {
        day: 1,
        title: "Day 1: Micro-Engagement & Outline",
        description: "Zero pressure setup. Read the rubric and draft initial layout comments to clear mental hurdles.",
        subtasks: [
          "Create local project directories & clone baseline code templates",
          "Highlight 3 most crucial components of grading rubrics",
          "Draw 4-box flowchart of standard tokens mapping"
        ]
      },
      {
        day: 2,
        title: "Day 2: Structural Implementation (Skeleton)",
        description: "Define class skeletons, abstract syntax trees, and node types.",
        subtasks: [
          "Initialize basic scanner parser script structure",
          "Code tree traversal skeletons (Visit nodes function)",
          "Verify that mock compiler files compile without type errors"
        ]
      },
      {
        day: 3,
        title: "Day 3: Deep Focus Algorithmic Block",
        description: "Devote a massive 3-hour protected focus window. Turn off student chats.",
        subtasks: [
          "Build recursive descent algorithms for arithmetic rules",
          "Write conditional expression handler methods",
          "Consult study partner or mentor on AST structural bugs"
        ]
      },
      {
        day: 4,
        title: "Day 4: Integration Mock Runs",
        description: "Connect parsers to actual intermediate outputs. Begin testing early constraints.",
        subtasks: [
          "Inject dummy sample input code strings into AST",
          "Debug symbol table resolution failures",
          "Cross-examine output blocks with expected answers"
        ]
      },
      {
        day: 5,
        title: "Day 5: Verification & Celebration",
        description: "Submit final build cleanly and attend social activities guilt-free.",
        subtasks: [
          "Double check final rubric rules & document your functions",
          "Export executable and submit submission link",
          "Unwind and celebrate starting early"
        ]
      }
    ]
  });

  // Mentoring & Chat States
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(DEFAULT_CHAT);
  const [userMsgInput, setUserMsgInput] = useState("");
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Proactive Accountability Prompts Cycling
  const PROACTIVE_NOTIFICATIONS = [
    {
      title: "Procrastination Warning Triggered 🚨",
      text: "Aegis detected you've updated CS Gala setup task but haven't started your Compiler Design Project due in 4 days. Let's do a 15-minute protected micro-session to open the file and read lines 1-10.",
      actionLabel: "Unlock 15-Min protected block",
    },
    {
      title: "Schedule Conflict Solved 🌱",
      text: "Student Senate Budget Briefing overlaps heavily with your Biochemistry synthesis study block tomorrow evening. Shall we box Senate to 45 minutes and delegate the catering agenda review to a classmate?",
      actionLabel: "Adjust schedule with Aegis advise",
    },
    {
      title: "Momentum Coach Check-in 🎯",
      text: "Starting is hard, continuing is easy! Your brain is avoiding Math because it looks too big. Let's break the preparation down into only 3 definitions. Ready to tackle them with a cozy coffee?",
      actionLabel: "Let's Kickstart",
    }
  ];
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Pomodoro Focus Room states
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // Default 15-minute sandbox
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Feedback notifications
  const [toast, setToast] = useState<string | null>(null);

  // Helper values
  const activeAcademicHours = tasks
    .filter(t => t.type === "academic" && t.status !== "completed")
    .reduce((sum, t) => sum + t.estimatedHours, 0);

  const activeClubHours = tasks
    .filter(t => t.type === "campus_org" && t.status !== "completed")
    .reduce((sum, t) => sum + t.estimatedHours, 0);

  const completedCount = tasks.filter(t => t.status === "completed").length;

  // Schedule diagnosis
  let scheduleDiagnosis = "Balanced Structure";
  let diagnosisDetail = "Your campus operations and classes are beautifully aligned under normal bounds. Cozy job!";
  let adviceColor = "text-emerald-700 bg-emerald-50 border-emerald-200";

  if (activeClubHours > activeAcademicHours && activeClubHours > 4) {
    scheduleDiagnosis = "Club Overload Detected ⚠️";
    diagnosisDetail = "Campus organizations are hijacking your energy bandwidth! Aegis highly advises delegating 1 agenda and blocking a study fortress tonight.";
    adviceColor = "text-amber-700 bg-amber-50 border-amber-200";
  } else if (activeAcademicHours > 15) {
    scheduleDiagnosis = "Academic Crash Approaching 🛑";
    diagnosisDetail = "Serious academic workloads (midterms & heavy coding) are looming. Reduce club obligations this week to guard your mental sleep schedules.";
    adviceColor = "text-rose-700 bg-rose-50 border-rose-300";
  }

  // Quote rotate & alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Timer run loop
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            showToast("🌟 Focus Session completed! Outstanding commitment. The mentor is proud.");
            return 15 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(15 * 60);
  };

  // Toast notifier helper
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Call API: Syllabus Parser
  const handleParseSyllabus = async () => {
    if (!parseText.trim()) {
      showToast("Please enter syllabus course text first.");
      return;
    }
    setIsParsing(true);
    try {
      const res = await fetch("/api/gemini/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: parseText })
      });
      const data = await res.json();
      if (data.tasks) {
        // assign real random ids
        const formatted: Task[] = data.tasks.map((t: any, i: number) => ({
          ...t,
          id: `ai-parsed-${Date.now()}-${i}`,
          status: "pending"
        }));
        setTasks((prev) => [...formatted, ...prev]);
        showToast(
          data.isSimulated 
            ? "Offline Mode: Parsed curriculums heuristically to load calendar seamlessly." 
            : "Gemini parser integrated! Academic items added to Priority Dashboard."
        );
        // Clear text box
        setParseText("");
      }
    } catch (err) {
      console.error(err);
      showToast("Critical parsing issue. Please check network logs.");
    } finally {
      setIsParsing(false);
    }
  };

  // Call API: Reverse engineer Goal Breakdown
  const handleBreakdownGoal = async () => {
    if (!goalTitle.trim()) {
      showToast("Please enter a custom milestone goal description.");
      return;
    }
    setIsBreakingDown(true);
    try {
      const res = await fetch("/api/gemini/breakdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goalTitle, daysCount })
      });
      const data = await res.json();
      if (data.breakdown) {
        setGeneratedBreakdown({
          ...data.breakdown,
          id: `breakdown-${Date.now()}`
        });
        showToast(
          data.isSimulated 
            ? "Offline: Created milestone scaffolding blueprints beautifully." 
            : "Gemini successfully deconstructed this massive objective chronologically!"
        );
      }
    } catch (err) {
      console.error(err);
      showToast("Error synthesizing goals. Please retry.");
    } finally {
      setIsBreakingDown(false);
    }
  };

  // Call API: Counselor Chat Message
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || userMsgInput;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory((prev) => [...prev, userMsg]);
    if (!customPrompt) setUserMsgInput("");
    setIsSendingChat(true);

    try {
      const currentSummarizedTasks = tasks.map(t => ({
        title: t.title,
        courseOrOrg: t.courseOrOrg,
        type: t.type,
        hours: t.estimatedHours,
        deadline: t.deadline,
        status: t.status,
        priority: t.priority
      }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatHistory, userMsg],
          currentTasks: currentSummarizedTasks
        })
      });
      const data = await res.json();
      if (data.reply) {
        const mentorMsg: ChatMessage = {
          id: `m-${Date.now()}`,
          sender: "mentor",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory((prev) => [...prev, mentorMsg]);
        
        // Auto-scroll logic if user is currently looking at chat
        if (activeTab !== 'chat') {
          showToast("Digital Mentor Aegis responded in the Counselor Lounge!");
        }
      }
    } catch (err) {
      console.error(err);
      showToast("Mentor is temporarily offline. Heuristic answers returned.");
    } finally {
      setIsSendingChat(false);
    }
  };

  // Task methods
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    const customTask: Task = {
      id: `custom-${Date.now()}`,
      title: newTaskTitle,
      courseOrOrg: newTaskCourse || "General",
      type: newTaskType,
      deadline: newTaskDeadline,
      estimatedHours: Number(newTaskHours),
      description: newTaskDesc || "Self-assigned productivity item.",
      status: "pending",
      priority: newTaskPriority
    };

    setTasks((prev) => [customTask, ...prev]);
    setNewTaskTitle("");
    setNewTaskDesc("");
    setShowAddForm(false);
    showToast("Custom schedule event integrated to active timeline.");
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextStatus = t.status === "pending" ? "in_progress" : t.status === "in_progress" ? "completed" : "pending";
          if (nextStatus === "completed") {
            showToast(`🎉 Balanced completion: Completed ${t.title}!`);
          }
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    showToast("Task removed from active timeline.");
  };

  const copyTemplateToClipboard = (type: 'academic' | 'club') => {
    setParseText(MOCK_SYLLABUS_TEMPLATES[type]);
    showToast(`Injected template: ${type === 'academic' ? 'AI Syllabus' : 'Senate Club Plan'} into parser!`);
  };

  const runActiveNotificationAction = () => {
    if (notificationIndex === 0) {
      // Focus timer action
      setTimeLeft(15 * 60);
      setIsTimerRunning(true);
      showToast("Protected 15-Minute focus window initiated. Aegis is recording progress!");
    } else if (notificationIndex === 1) {
      // chat conflict resolution
      setActiveTab('chat');
      handleSendMessage("Suggest a resolution strategy for my Biochemistry lab and Senate Budget clash.");
    } else {
      // Let's start task
      setActiveTab('chat');
      handleSendMessage("I am having trouble starting my tasks. Help me find low-activation energy microsteps.");
    }
  };

  // Convert seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased flex flex-col justify-between">
      {/* Toast Alert Header */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white font-medium px-5 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 max-w-sm md:max-w-md text-sm cursor-pointer"
            onClick={() => setToast(null)}
          >
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COMPONENT 1: HEADER & PROFILE RAIL (Left Rail / Grid Row spanning columns) */}
        <header className="lg:col-span-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Aegis <span className="font-sans font-normal text-slate-500 text-base">AI Academic Mentor</span>
              </h1>
              <p className="text-sm text-slate-500 font-medium">Bypassing student procrastination through empathetic academic scaffolding</p>
            </div>
          </div>

          {/* Inspirational quotes carousel block */}
          <div className="w-full md:max-w-md bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center gap-3">
            <Award className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="overflow-hidden relative h-5 flex-1">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="text-xs italic font-medium text-slate-600 absolute inset-0 text-ellipsis overflow-hidden whitespace-nowrap"
                >
                  {MOTIVATIONAL_QUOTES[quoteIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* CONTAINER LEFT COLUMN: MENTOR AND PROACTIVE ACCOUNTABILITY CENTER (lg:col-span-4) */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          
          {/* Proactive Accountability Alert Block */}
          <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50/50 rounded-full -mr-8 -mt-8 -z-10" />
            
            <div className="flex items-center gap-2 text-rose-700 font-semibold text-sm mb-3">
              <AlertTriangle className="w-4 h-4 animate-bounce shrink-0" />
              <span>{PROACTIVE_NOTIFICATIONS[notificationIndex].title}</span>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed mb-4 font-medium bg-rose-50/30 p-3 rounded-xl border border-rose-50">
              {PROACTIVE_NOTIFICATIONS[notificationIndex].text}
            </p>

            <div className="flex items-center justify-between gap-2 mt-2">
              <button 
                onClick={runActiveNotificationAction}
                id="cta-proactive-alarm"
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition duration-150 shadow-xs flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                {PROACTIVE_NOTIFICATIONS[notificationIndex].actionLabel}
              </button>
              <button 
                onClick={() => setNotificationIndex((prev) => (prev + 1) % PROACTIVE_NOTIFICATIONS.length)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold px-3 py-2 border border-slate-100 rounded-xl"
              >
                Next Trigger
              </button>
            </div>
          </div>

          {/* Supportive Pomodoro Mini Sandbox Timer */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-display font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              15-Min Proactivity Sandbox
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-normal">
              Need to clear procrastination resistance? Commit to exactly 15 minutes of quiet engagement. Aegis will cheer you on.
            </p>

            <div className="bg-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center text-white border border-slate-800 select-none">
              <div className="text-3xl font-mono font-bold tracking-widest text-emerald-400 mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTimer}
                  className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 p-2 rounded-full transition shadow-md flex items-center justify-center"
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={resetTimer}
                  className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition border border-slate-700 flex items-center justify-center"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Aegis Digital Counselor Lounge */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex-1 flex flex-col min-h-[380px] lg:max-h-[500px]">
            <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-display font-semibold text-slate-900 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500Fill text-rose-500 fill-rose-100" />
                  Mentor Counseling Lounge
                </h3>
                <p className="text-xs text-slate-400">Wise accountability partner and micro-planner</p>
              </div>
              <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-700 font-bold tracking-tight">ONLINE</span>
              </div>
            </div>

            {/* Chats stream container */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {chatHistory.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col max-w-[85%] rounded-2xl px-3 py-2 border ${
                    msg.sender === "mentor" 
                      ? "bg-slate-50 text-slate-700 border-slate-100 self-start rounded-tl-none" 
                      : "bg-emerald-600 text-white border-emerald-500 self-end rounded-tr-none ml-auto"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                  <span className={`text-[9px] mt-1 text-right block ${msg.sender === "mentor" ? "text-slate-400" : "text-emerald-200"}`}>
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              {isSendingChat && (
                <div className="bg-slate-50 text-slate-400 border border-slate-100 self-start max-w-[50%] p-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                </div>
              )}
            </div>

            {/* Quick coaching question suggestion chips */}
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-50 pt-3">
              <button 
                onClick={() => handleSendMessage("Suggest an immediate 10-minute task to beat procrastination.")}
                className="bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] px-2.5 py-1.5 rounded-lg border border-slate-200/80 transition duration-100 shrink-0 font-medium"
              >
                📋 Micro-steps setup
              </button>
              <button 
                onClick={() => handleSendMessage("How do I stay firm with club meetings while exams are due?")}
                className="bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] px-2.5 py-1.5 rounded-lg border border-slate-200/80 transition duration-100 shrink-0 font-medium"
              >
                ⚖️ Overcome club peer pressure
              </button>
            </div>

            {/* Input form */}
            <div className="mt-3 flex gap-1.5">
              <input
                type="text"
                placeholder="Ask Aegis to breakdown, advise study blockings..."
                value={userMsgInput}
                onChange={(e) => setUserMsgInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-emerald-500 focus:bg-white text-slate-800"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl p-2 transition duration-150 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* CONTAINER RIGHT COLUMN: SCHEDULER, SYLLABUS PARSER & GOAL BREAKER (lg:col-span-8) */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">

          {/* Tab Selection */}
          <div className="flex border-b border-slate-200 bg-white p-1 rounded-xl border">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-semibold rounded-lg transition duration-200 ${
                activeTab === 'calendar' 
                  ? "bg-slate-900 text-white shadow-xs" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Priority Scheduler & Parsing Unit
            </button>
            <button
              onClick={() => setActiveTab('goal')}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-semibold rounded-lg transition duration-200 ${
                activeTab === 'goal' 
                  ? "bg-slate-900 text-white shadow-xs" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Massive Goal Deconstructor
            </button>
          </div>

          {/* ACTIVE VIEW TAB 1: PARSING PLATFORM & PRIORITY TIMELINE */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">

              {/* Syllabus parsing console */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-display font-semibold text-slate-900 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      Curriculum Syllabus & Club Sync Parser
                    </h3>
                    <p className="text-xs text-slate-400">Extract assignments directly from paper texts or announcements messages</p>
                  </div>
                  
                  {/* Template injections values */}
                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="font-bold text-slate-500">Fast Templates:</span>
                    <button 
                      onClick={() => copyTemplateToClipboard('academic')}
                      className="bg-slate-50 hover:bg-emerald-50 text-emerald-800 border border-slate-200 hover:border-emerald-200 px-2.5 py-1 rounded-md transition"
                    >
                      📚 AI Class Course
                    </button>
                    <button 
                      onClick={() => copyTemplateToClipboard('club')}
                      className="bg-slate-50 hover:bg-amber-50 text-amber-805 border border-slate-200 hover:border-amber-200 px-2.5 py-1 rounded-md transition"
                    >
                      🎪 Campus Senate Club
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <textarea
                    placeholder="Paste unformatted syllabus sections, teacher emails, or club message channels here..."
                    rows={4}
                    value={parseText}
                    onChange={(e) => setParseText(e.target.value)}
                    className="w-full text-xs font-mono bg-slate-50 border border-slate-200/80 rounded-xl p-3 focus:outline-hidden focus:border-slate-800 text-slate-700 placeholder:font-sans focus:bg-white"
                  />
                  
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-slate-400 italic">
                      💡 Uses Server-side AI parsing with contextual academic weights estimation
                    </p>
                    <button
                      onClick={handleParseSyllabus}
                      disabled={isParsing}
                      className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-xs px-5 py-2.5 rounded-xl transition duration-150 shadow-md flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isParsing ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                          Analyzing and Building Priority Calendar...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                          Synthesize AI Deadlines & Tasks
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>


              {/* Active Student Metrics Deck */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* Workload hours gauge card */}
                <div className="md:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Chronological Prep Fatigue Ratio</h4>
                      <BarChart className="w-4 h-4 text-slate-400" />
                    </div>
                    {/* Visual bar comparing academic studies vs org workload */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden flex">
                        <div 
                          style={{ width: `${(activeAcademicHours / (activeAcademicHours + activeClubHours || 1)) * 100}%` }}
                          className="bg-slate-900 h-full transition-all duration-300"
                          title="Academic Prep Time Allocation"
                        />
                        <div 
                          style={{ width: `${(activeClubHours / (activeAcademicHours + activeClubHours || 1)) * 100}%` }}
                          className="bg-amber-500 h-full transition-all duration-300"
                          title="Club Operations Time Allocation"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                          <span className="text-slate-500 text-xs">Academic Deliverables</span>
                        </div>
                        <div className="text-lg font-mono font-bold text-slate-900 ml-4 mt-0.5">
                          {activeAcademicHours} <span className="text-[10px] font-sans font-normal text-slate-400">hours prep</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span className="text-slate-500 text-xs">Campus Club Syncs</span>
                        </div>
                        <div className="text-lg font-mono font-bold text-slate-900 ml-4 mt-0.5">
                          {activeClubHours} <span className="text-[10px] font-sans font-normal text-slate-400">hours prep</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accountability Shield Score card */}
                <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Commitment Metrics</h4>
                    <Award className="w-4.5 h-4.5 text-emerald-500" />
                  </div>
                  <div className="mt-2">
                    <div className="text-3xl font-mono font-bold text-slate-900 tracking-tight flex items-baseline">
                      {completedCount}
                      <span className="text-xs font-sans text-slate-400 font-medium ml-1">tasks completed</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-normal">
                      Outstanding performance offsets standard student stress! Active pacing:
                    </div>
                  </div>
                  <div className="mt-2 bg-slate-50 rounded-xl px-2.5 py-1.5 border border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Live Backlog:</span>
                    <span className="font-mono font-bold text-slate-800">{tasks.filter(t => t.status !== "completed").length} pending</span>
                  </div>
                </div>

              </div>

              {/* Aegis Proactive Schedule Diagnosis */}
              <div className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${adviceColor}`}>
                <Brain className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold leading-none mb-1">{scheduleDiagnosis}</h4>
                  <p className="text-[11px] leading-relaxed opacity-90">{diagnosisDetail}</p>
                </div>
              </div>


              {/* Primary Chronological Calendar Timeline Grid */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-display font-semibold text-slate-900">
                      Chronological Priority Timeline
                    </h3>
                    <p className="text-xs text-slate-400">Ranked chronologically to handle academic conflicts dynamically</p>
                  </div>
                  
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-3.5 py-2 rounded-xl transition duration-150 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Manually Add Schedule
                  </button>
                </div>

                {/* Optional manual Form */}
                <AnimatePresence>
                  {showAddForm && (
                    <motion.form 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleAddTask}
                      className="bg-slate-50/50 p-4 rounded-xl border border-slate-200 space-y-3 mb-4 overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">Deliverable or Meeting Name</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="e.g., Build AST generator script"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="bg-white border text-xs border-slate-200 rounded-lg p-2 w-full focus:outline-hidden mt-1" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">Course or Club Organization</label>
                          <input 
                            type="text" 
                            placeholder="e.g., CS302 Compiler Design / Club Sync"
                            value={newTaskCourse}
                            onChange={(e) => setNewTaskCourse(e.target.value)}
                            className="bg-white border text-xs border-slate-200 rounded-lg p-2 w-full focus:outline-hidden mt-1" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">Track Type</label>
                          <select 
                            value={newTaskType}
                            onChange={(e) => setNewTaskType(e.target.value as any)}
                            className="bg-white border text-xs border-slate-200 rounded-lg p-2 w-full focus:outline-hidden mt-1"
                          >
                            <option value="academic">Academic Class</option>
                            <option value="campus_org">Campus Organization</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">Target Deadline</label>
                          <input 
                            type="date" 
                            value={newTaskDeadline}
                            onChange={(e) => setNewTaskDeadline(e.target.value)}
                            className="bg-white border text-xs border-slate-200 rounded-lg p-2 w-full focus:outline-hidden mt-1" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">Estimated Hours Needed</label>
                          <input 
                            type="number" 
                            min={1} 
                            max={50}
                            value={newTaskHours}
                            onChange={(e) => setNewTaskHours(Number(e.target.value))}
                            className="bg-white border text-xs border-slate-200 rounded-lg p-2 w-full focus:outline-hidden mt-1" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">Procrastination Alert Risk</label>
                          <select 
                            value={newTaskPriority}
                            onChange={(e) => setNewTaskPriority(e.target.value as any)}
                            className="bg-white border text-xs border-slate-200 rounded-lg p-2 w-full focus:outline-hidden mt-1"
                          >
                            <option value="high">High Risk Alert</option>
                            <option value="medium">Medium Standard</option>
                            <option value="low">Low Frictionless</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Coordinating Description</label>
                        <input 
                          type="text" 
                          placeholder="What details would make this less daunting?"
                          value={newTaskDesc}
                          onChange={(e) => setNewTaskDesc(e.target.value)}
                          className="bg-white border text-xs border-slate-200 rounded-lg p-2 w-full focus:outline-hidden mt-1" 
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button 
                          type="button" 
                          onClick={() => setShowAddForm(false)}
                          className="px-3.5 py-2 hover:bg-slate-100 text-slate-600 text-xs rounded-lg border"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs rounded-lg"
                        >
                          Integrate Event
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Priority items timeline cards */}
                <div className="space-y-3">
                  {tasks.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 border border-dashed rounded-xl">
                      <p className="text-xs text-slate-400">All prioritized schedules cleared cleanly! Use the parser module up top to inject timelines instantly.</p>
                    </div>
                  ) : (
                    tasks
                      .sort((a,b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                      .map((task, i) => {
                        const isAcademic = task.type === "academic";
                        const isCompleted = task.status === "completed";
                        const isInProgress = task.status === "in_progress";
                        const formattedDateStr = new Date(task.deadline).toLocaleDateString([], { 
                          weekday: 'short', month: 'short', day: 'numeric' 
                        });

                        return (
                          <div 
                            key={task.id}
                            id={`timeline-card-${task.id}`}
                            className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition duration-150 ${
                              isCompleted 
                                ? "bg-slate-50/70 border-slate-200 opacity-60 line-through" 
                                : isInProgress
                                ? "bg-white border-emerald-500 shadow-xs" 
                                : isAcademic
                                ? "bg-white border-slate-200" 
                                : "bg-white border-slate-200 hover:bg-amber-50/20"
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              {/* Clickable checklist element */}
                              <button 
                                onClick={() => toggleTaskStatus(task.id)}
                                className="mt-0.5 pointer"
                              >
                                {isCompleted ? (
                                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                                ) : isInProgress ? (
                                  <span className="w-5 h-5 block rounded-lg border-2 border-emerald-500 bg-white relative">
                                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
                                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                  </span>
                                ) : (
                                  <span className="w-5 h-5 block rounded-lg border-2 border-slate-300 hover:border-slate-800 bg-white" />
                                )}
                              </button>

                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className={`text-xs font-semibold ${isCompleted ? 'text-slate-400' : 'text-slate-800'}`}>
                                    {task.title}
                                  </h4>
                                  
                                  {/* Academic tag vs org tag */}
                                  <span className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase ${
                                    isAcademic 
                                      ? "bg-slate-100 text-slate-700 border border-slate-200" 
                                      : "bg-amber-100 text-amber-800 border border-amber-200"
                                  }`}>
                                    {isAcademic ? "Class Assignment" : "Campus Organization"}
                                  </span>

                                  {/* Procrastination Risk Badge */}
                                  {task.priority === "high" && !isCompleted && (
                                    <span className="text-[9px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100 uppercase animate-pulse-slow">
                                      High Procrastination Alert Risk
                                    </span>
                                  )}
                                </div>

                                <p className="text-[11px] text-slate-500 mt-1 leading-normal max-w-xl">
                                  {task.description}
                                </p>
                                
                                <div className="flex items-center gap-3.5 mt-2 text-[10px] text-slate-400 font-mono font-medium">
                                  <span>🏫 {task.courseOrOrg}</span>
                                  <span>⏳ Est. Working Block: {task.estimatedHours}h</span>
                                </div>
                              </div>
                            </div>

                            {/* Right action block */}
                            <div className="flex md:flex-col items-end justify-between md:justify-center gap-1.5 border-t md:border-t-0 border-slate-100 pt-2.5 md:pt-0 shrink-0">
                              <span className={`text-[10px] font-mono font-bold uppercase tracking-tight px-2 py-1 rounded-md ${
                                isCompleted 
                                  ? "bg-slate-100 text-slate-400"
                                  : "bg-slate-900 text-white"
                              }`}>
                                Due {formattedDateStr}
                              </span>

                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleSendMessage(`I need advice on managing: "${task.title}". It takes ${task.estimatedHours} hours. How can I kickstart this?`)}
                                  className="text-slate-450 hover:text-slate-800 text-[10px] font-semibold px-2 py-1 border border-slate-100 rounded-md hover:bg-slate-50 flex items-center gap-1"
                                >
                                  <MessageSquare className="w-3 h-3 text-slate-400" />
                                  Mentor Advise
                                </button>
                                <button 
                                  onClick={() => deleteTask(task.id)}
                                  className="text-rose-600 hover:text-rose-800 p-1 rounded-md hover:bg-rose-50 border border-transparent"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>

            </div>
          )}

          {/* ACTIVE VIEW TAB 2: MASSIVE GOAL BLUEPRINT DECONSTRUCTOR */}
          {activeTab === 'goal' && (
            <div className="space-y-6">
              
              {/* Objective Breakdown controller */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <h3 className="text-sm font-display font-semibold text-slate-900 flex items-center gap-1.5">
                    <Brain className="w-4.5 h-4.5 text-emerald-600 animate-pulse-slow" />
                    Massive Goal Reverse-Engineer Engine
                  </h3>
                  <p className="text-xs text-slate-400">Transform scary giant tasks into tiny, procrastination-proof daily micro-engagement steps</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-8 space-y-1">
                    <label className="text-xs font-semibold text-slate-500">What massive academic milestone goal is scaring you right now?</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:outline-hidden focus:border-slate-900 focus:bg-white text-slate-800"
                      value={goalTitle}
                      onChange={(e) => setGoalTitle(e.target.value)}
                      placeholder="e.g., Biochemistry Final Oral Exam / Student Council Winter Showcase Gala"
                    />
                  </div>

                  <div className="md:col-span-4 flex items-center gap-2">
                    <div className="flex-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Timeline Length</label>
                      <select 
                        value={daysCount}
                        onChange={(e) => setDaysCount(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden text-slate-700"
                      >
                        <option value={3}>3 Days (Fast Pace)</option>
                        <option value={5}>5 Days (Optimal Pacing)</option>
                        <option value={7}>7 Days (Deep Protection)</option>
                      </select>
                    </div>

                    <button
                      onClick={handleBreakdownGoal}
                      disabled={isBreakingDown}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-3.5 rounded-xl transition duration-150 shadow-md flex items-center gap-1.5 mt-5 disabled:opacity-50 text-nowrap select-none shrink-0"
                    >
                      {isBreakingDown ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Deconstructing Scaffold...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          Deconstruct Goal via AI
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Milestone Scaffolding Grid */}
              {generatedBreakdown && (
                <div className="bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full" />
                  
                  <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-6">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">Scaffolding Blueprint</span>
                      <h3 className="text-lg font-display font-bold text-white mt-1">
                        Deconstructed Roadmap: {generatedBreakdown.goalTitle}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Aim to finalize before target deadline: <span className="font-mono text-emerald-400">{generatedBreakdown.targetDate}</span>
                      </p>
                    </div>

                    <button 
                      onClick={() => handleSendMessage(`Help me plan Day 1 details of: "${generatedBreakdown.goalTitle}"`)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold px-3 py-2 rounded-lg border border-slate-700 transition"
                    >
                      Ask Mentor to Launch Day 1
                    </button>
                  </div>

                  {/* Day cards */}
                  <div className="space-y-4">
                    {generatedBreakdown.milestones.map((ms) => {
                      const isFirst = ms.day === 1;
                      const isLast = ms.day === generatedBreakdown.milestones.length;

                      return (
                        <div 
                          key={ms.day} 
                          className={`p-4 rounded-xl border transition ${
                            isFirst 
                              ? "bg-slate-800/80 border-emerald-500/20" 
                              : "bg-slate-900/50 border-slate-800/80"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <span className={`text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase self-start sm:self-auto ${
                              isFirst 
                                ? "bg-emerald-500/20 text-emerald-400" 
                                : isLast
                                ? "bg-amber-500/20 text-amber-400"
                                : "bg-slate-800 text-slate-400"
                            }`}>
                              Milestone Day {ms.day} {isFirst && "✨ FRICTIONLESS COMMENCEMENT"}
                            </span>
                            <h4 className="text-white font-semibold text-xs sm:text-sm">{ms.title}</h4>
                          </div>

                          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                            {ms.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 pl-2 border-l border-slate-800">
                            {ms.subtasks.map((st, sidx) => (
                              <div key={sidx} className="flex items-start gap-2 text-xs text-slate-300">
                                <span className="text-emerald-400 font-bold font-mono mt-0.5">•</span>
                                <span>{st}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white py-4 text-center text-xs text-slate-400 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Aegis Educational Systems • Designed for Cognitive Scaffolding and High Activation Ratios</span>
          <div className="flex items-center gap-3">
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">Settings & Secrets Managed Autonomously</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
