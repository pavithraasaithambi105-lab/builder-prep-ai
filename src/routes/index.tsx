import { createFileRoute } from "@tanstack/react-router";
import {
  Bullets,
  Flow,
  Note,
  Pull,
  Section,
  StackItem,
  SubHeading,
  Visual,
} from "@/components/blog/parts";
import { ExportPdfButton } from "@/components/blog/ExportPdfButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Building an AI Interviewer to Help Students Practice Smarter" },
      {
        name: "description",
        content:
          "How I am building AI Interviewer, an AI-powered interview practice platform for students using React, FastAPI and Gemini.",
      },
      {
        property: "og:title",
        content: "Building an AI Interviewer to Help Students Practice Smarter",
      },
      {
        property: "og:description",
        content:
          "A builder story: using Generative AI to make interview practice more accessible and personalized for students.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

const toc = [
  ["intro", "Introduction"],
  ["problem", "The Problem"],
  ["idea", "My Idea"],
  ["how-it-works", "How It Works"],
  ["gemini", "How Gemini Is Used"],
  ["stack", "Technology Stack"],
  ["architecture", "System Architecture"],
  ["sample", "A Sample Interview"],
  ["data", "Data & Candidate Processing"],
  ["challenges", "Challenges"],
  ["learned", "What I Learned"],
  ["next", "What's Next"],
  ["vision", "The Bigger Vision"],
  ["final", "Final Thoughts"],
];

function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <header className="border-b border-border bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-primary">
            Builder Story &nbsp;/&nbsp; Google Cloud Gen AI Academy — Cohort 3 &nbsp;/&nbsp; Meet the
            Builders, APAC
          </p>
          <h1 className="mt-6 text-4xl leading-[1.08] text-ink sm:text-6xl">
            Building an AI Interviewer to Help Students Practice Smarter
          </h1>
          <p className="mt-5 prose-lead">
            An AI-powered interview practice platform that simulates an interviewer, generates
            relevant questions, understands candidate answers, and gives personalized feedback — so
            students can practice anytime, not only when a mentor is available.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["React", "Python", "FastAPI", "Gemini / Generative AI", "REST APIs", "JSONL data", "Git & GitHub"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground"
                >
                  {t}
                </span>
              ),
            )}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3" data-print-hide>
            <ExportPdfButton />
            <span className="text-sm text-muted-foreground">
              Opens your print dialog — choose "Save as PDF" to share or present.
            </span>
          </div>
          <Visual
            label="SCREENSHOT: AI Interviewer interface (hero image)"
            caption="Visual 1 — the main interview screen candidates see."
          />
        </div>
      </header>


      <div className="mx-auto max-w-3xl px-5 pb-24">
        {/* TOC */}
        <nav
          aria-label="Table of contents"
          className="mt-10 rounded-lg border border-border bg-card p-5 shadow-soft"
        >
          <p className="font-mono text-[0.72rem] uppercase tracking-widest text-muted-foreground">
            In this article
          </p>
          <ol className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {toc.map(([id, label], i) => (
              <li key={id} className="text-[0.95rem]">
                <a
                  href={`#${id}`}
                  className="text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  <span className="mr-2 font-mono text-xs text-primary/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <Section id="intro" number="01" title="Introduction">
          <p>
            The first time I sat in a mock interview, I realised something uncomfortable: I knew the
            answer, but I could not explain it well. I paused in the wrong places, jumped between
            points, and when the interviewer asked a small follow-up question, I lost the thread
            completely.
          </p>
          <p>
            That experience is not unusual. Most students I know spend weeks revising concepts, but
            very little time practicing how to <em>say</em> those concepts out loud. Interview
            preparation is not only about knowing answers. Students also need to:
          </p>
          <Bullets
            items={[
              "Explain concepts clearly, in their own words",
              "Handle follow-up questions without panicking",
              "Communicate with some confidence",
              "Practice under conditions that feel like a real interview",
              "Understand where they are actually weak",
            ]}
          />
          <p>
            The catch is access. Not every student has a mentor, a senior, or a friend who is free
            at 11 p.m. the night before a placement drive. Mock interviews happen occasionally,
            usually in a group, and rarely with feedback that is specific to you.
          </p>
          <Pull>What if students could practice interviews with an AI interviewer anytime, anywhere?</Pull>
          <p>
            <strong>AI Interviewer</strong> is my attempt to answer that question. It is a practice
            platform where a candidate sets up an interview, an AI asks relevant questions,
            the candidate answers, and the AI responds with feedback on what was good and what could
            be explained better. This article is the honest story of building it — what works, what
            is still in progress, and what I learned along the way.
          </p>
        </Section>

        <Section id="problem" number="02" title="The Problem I Wanted to Solve">
          <p>
            I did not want to start from a technology and look for a use case. I started from
            something I and my classmates were already struggling with. When I looked at it closely,
            the preparation gap broke down into a few recurring problems.
          </p>
          <Bullets
            items={[
              <>
                <strong>Very few mock interviews.</strong> Most students get one or two before their
                real interview, which is not enough to build a habit.
              </>,
              <>
                <strong>Limited access to mentors.</strong> Seniors and faculty are helpful, but
                they are busy, and practice usually has to fit their schedule.
              </>,
              <>
                <strong>Communication is hard to practice alone.</strong> Reading notes silently
                does not prepare you for speaking under pressure.
              </>,
              <>
                <strong>Nervousness.</strong> A lot of students know more than they manage to show
                in the room. Repetition is one of the few reliable cures.
              </>,
              <>
                <strong>Feedback is generic.</strong> "Be more confident" is honest advice, but it
                does not tell you which answer was weak or why.
              </>,
              <>
                <strong>Improvement is hard to track.</strong> Without a record of past attempts,
                it is difficult to know whether you are actually getting better.
              </>,
            ]}
          />
          <p>
            None of this is a crisis. Students do clear interviews every year. But the practice
            process is uneven, and it depends heavily on who you happen to know.
          </p>
          <p>
            That is why I wanted an AI-powered solution. A fixed question bank cannot ask you a
            follow-up question or comment on how you explained something. A language model can read
            a free-form answer and respond to it. That difference is what makes an AI interviewer
            worth building rather than just another list of "top 50 interview questions".
          </p>
          <Visual
            label="DIAGRAM: Problem → Solution"
            caption="Visual 2 — left side: limited mock interviews, generic feedback, no tracking. Right side: on-demand AI practice, specific feedback, repeatable sessions."
          />
        </Section>

        <Section id="idea" number="03" title="My Idea">
          <p>
            The idea came from reversing the usual flow. Instead of a student searching for
            questions, the questions would come to the student — generated for their target role,
            followed by feedback on their own words.
          </p>
          <p>Written as a loop, the concept is simple:</p>
          <Flow
            title="Core loop"
            steps={[
              "Candidate",
              "Interview setup",
              "AI-generated questions",
              "Candidate response",
              "AI analysis",
              "Feedback",
              "Improvement",
            ]}
          />
          <p>
            The important word in that loop is <em>improvement</em>. A single mock interview is
            useful; twenty of them, each with specific feedback, is what actually changes how you
            answer.
          </p>
          <Note>
            To be clear about the goal: AI Interviewer is not meant to replace human interviewers or
            mentors. A real interviewer brings judgement, context and experience that a model does
            not have. What this project offers is an additional practice environment — one that is
            available whenever a student wants to try again.
          </Note>
        </Section>

        <Section id="how-it-works" number="04" title="How AI Interviewer Works">
          <p>
            Here is the intended journey from a candidate's point of view. Some parts are working
            and some are still being built; I have marked those clearly.
          </p>

          <SubHeading>4.1 Candidate Profile</SubHeading>
          <p>
            An interview is only useful if it matches the person taking it. Candidate information —
            skills, experience level, information from a resume, and the target role — can be used
            to shape which questions get asked. A student aiming for a backend role should not get
            the same interview as a student aiming for a data role.
          </p>
          <Note>
            Automatic resume parsing is <strong>not confirmed as implemented</strong> in the current
            version. Right now candidate information comes from structured candidate data;
            full resume upload and parsing is a planned feature.
          </Note>

          <SubHeading>4.2 Interview Setup</SubHeading>
          <p>
            Before the session starts, the interview can be configured — the target role and the
            technical area the student wants to be tested on. This setup is what gets passed to the
            AI so the questions stay relevant instead of being random.
          </p>

          <SubHeading>4.3 Question Generation</SubHeading>
          <p>
            Generative AI generates the questions rather than pulling them from a fixed list. Based
            on the setup, questions can cover:
          </p>
          <Bullets
            items={[
              "Technical questions on the chosen area",
              "Project-related questions about what the candidate has built",
              "HR questions",
              "Behavioral questions",
              "Follow-up questions based on what the candidate just said",
            ]}
          />
          <p>
            The last one matters most. A static question bank cannot ask "why did you choose that?"
            — an AI interviewer can.
          </p>

          <SubHeading>4.4 Candidate Response</SubHeading>
          <p>
            The candidate answers the AI interviewer in their own words through the React interface,
            as text. Answers are sent to the backend, which passes them on for analysis.
          </p>
          <Note>
            Spoken, real-time voice interaction is a <strong>future improvement</strong>, not a
            current feature. Today the conversation is text-based.
          </Note>

          <SubHeading>4.5 AI Evaluation</SubHeading>
          <p>
            Once an answer is submitted, the AI reviews it and comments on factors such as:
          </p>
          <Bullets
            items={[
              "Technical correctness",
              "Relevance to the question asked",
              "Clarity of explanation",
              "Completeness — what was missed",
              "Communication",
            ]}
          />
          <Note>
            These are AI-generated observations, not scientifically validated scores. They are meant
            as practice feedback and can be wrong. A student should treat them as a second opinion,
            not a verdict.
          </Note>

          <SubHeading>4.6 Personalized Feedback</SubHeading>
          <p>Feedback is the part that turns practice into progress. The intended output includes:</p>
          <Bullets
            items={[
              "Strengths — what the answer got right",
              "Weak areas — what was missing or unclear",
              "Suggestions for improving the answer",
              "A better way to structure or phrase the explanation",
              "Topics worth revising before the next attempt",
            ]}
          />
          <Visual
            label="DIAGRAM: How AI Interviewer works (end-to-end workflow)"
            caption="Visual 3 — profile → setup → question → answer → evaluation → feedback → repeat."
          />
        </Section>

        <Section id="gemini" number="05" title="How Generative AI / Gemini Is Used">
          <p>
            It would be easy to write "I used the Gemini API" and move on, but that skips the
            interesting part: <em>why</em> a generative model is the right tool here at all.
          </p>
          <p>
            An interview is an open-ended conversation. The candidate can answer in any wording, at
            any length, at any level of correctness. Traditional rule-based logic cannot handle
            that — you cannot write if-else conditions for every possible way a student might
            explain a linked list. A language model can read the answer as written and respond to it
            in context. That is the whole reason Generative AI sits at the centre of this project.
          </p>
          <p>Concretely, Gemini is used for:</p>
          <Bullets
            items={[
              <>
                <strong>Interview question generation</strong> — producing questions that fit the
                candidate's target role and chosen technical area.
              </>,
              <>
                <strong>Understanding natural-language responses</strong> — interpreting an answer
                written in the student's own words, without a fixed format.
              </>,
              <>
                <strong>Contextual follow-up questions</strong> — asking the next question based on
                what the candidate actually said, the way a real interviewer would.
              </>,
              <>
                <strong>Evaluating answers</strong> — commenting on correctness, relevance, clarity
                and completeness.
              </>,
              <>
                <strong>Generating personalized feedback</strong> — turning that evaluation into
                readable, specific suggestions.
              </>,
            ]}
          />
          <p>
            The result is that the interview experience is dynamic. Two students preparing for the
            same role will not get an identical script, and the same student practicing twice will
            not walk through the same session again.
          </p>
          <Note>
            A voice-based, real-time interview experience (for example using a live/streaming voice
            capability) is a <strong>future direction</strong> for this project. It is not
            implemented today, and nothing in the current version depends on it.
          </Note>
          <Visual
            label="DIAGRAM: Gemini / AI processing flow"
            caption="Visual 4 — candidate context + answer → prompt → Gemini → question, evaluation and feedback."
          />
        </Section>

        <Section id="stack" number="06" title="Technology Stack">
          <p>
            The stack is deliberately small. Every piece below is something the project actually
            uses, and each one has a clear job.
          </p>
          <div className="my-6 grid gap-4 sm:grid-cols-2">
            <StackItem role="Frontend" name="React">
              The candidate-facing interview interface — interview setup, the question and answer
              screen, and the feedback view. This is the only part the student interacts with
              directly.
            </StackItem>
            <StackItem role="Backend" name="Python + FastAPI">
              Backend APIs and application logic. FastAPI handles the requests coming from React,
              runs candidate processing, prepares what gets sent to the AI, and returns the results.
            </StackItem>
            <StackItem role="AI" name="Gemini / Generative AI">
              Question generation, answer understanding, follow-up questions, evaluation and
              feedback — the dynamic parts of the interview.
            </StackItem>
            <StackItem role="Communication" name="REST APIs">
              The contract between the frontend and the backend. React sends interview and answer
              data over REST; FastAPI responds with questions and feedback.
            </StackItem>
            <StackItem role="Data" name="Candidate dataset (JSONL / JSON)">
              Candidate information is stored and read as JSONL/JSON records, parsed in the backend
              and converted into structured data the interview logic can use.
            </StackItem>
            <StackItem role="Development" name="Git & GitHub">
              Version control and project history — which mattered more than I expected once I
              started breaking things and needing to go back.
            </StackItem>
          </div>
        </Section>

        <Section id="architecture" number="07" title="System Architecture">
          <p>
            The architecture is intentionally straightforward: a frontend, a backend, candidate
            data, and the AI. There is no hidden complexity behind it.
          </p>
          <Flow
            title="Conceptual flow"
            steps={[
              "Candidate",
              "React Frontend",
              "FastAPI Backend",
              "Candidate / Interview Data",
              "Gemini",
              "AI-generated Interview",
              "Candidate Response",
              "AI Evaluation",
              "Feedback",
              "Candidate",
            ]}
          />
          <p>What each component does:</p>
          <Bullets
            items={[
              <>
                <strong>React Frontend</strong> — collects the interview setup, displays questions,
                takes the candidate's answer and shows the feedback.
              </>,
              <>
                <strong>FastAPI Backend</strong> — receives requests over REST, loads and structures
                candidate information, builds the request sent to the AI, and returns the response
                to the frontend.
              </>,
              <>
                <strong>Candidate / Interview Data</strong> — JSONL/JSON candidate records that
                provide the context used to personalize an interview.
              </>,
              <>
                <strong>Gemini</strong> — generates questions, interprets the candidate's answer and
                produces evaluation and feedback text.
              </>,
            ]}
          />
          <Note>
            Suggested diagram: a single left-to-right lane — Candidate → React → FastAPI → Gemini —
            with candidate data feeding into FastAPI from below, and a return arrow carrying
            feedback back to the candidate. Keep it to four boxes; the simplicity is the point.
          </Note>
          <Visual
            label="DIAGRAM: System architecture"
            caption="Visual 5 — React, FastAPI, candidate data and Gemini, with the request/response loop."
          />
        </Section>

        <Section id="sample" number="08" title="A Sample AI Interview">
          <p>
            To make this concrete, here is what one exchange looks like. This is a demonstration of
            the intended experience — the exact wording and labels below are illustrative rather
            than a screenshot of live output.
          </p>

          <div className="my-6 space-y-4">
            <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
              <p className="font-mono text-[0.72rem] uppercase tracking-widest text-primary">
                AI Interviewer
              </p>
              <p className="mt-2">
                "Can you explain the difference between an array and a linked list?"
              </p>
            </div>

            <div className="rounded-lg border border-border bg-secondary/60 p-5">
              <p className="font-mono text-[0.72rem] uppercase tracking-widest text-muted-foreground">
                Candidate
              </p>
              <p className="mt-2">
                "An array stores elements in a continuous block of memory, so we can access any
                element directly using the index. A linked list stores each element in a node, and
                each node points to the next one, so we have to traverse from the start to reach an
                element."
              </p>
            </div>

            <div className="rounded-lg border border-primary/30 bg-accent/40 p-5">
              <p className="font-mono text-[0.72rem] uppercase tracking-widest text-accent-foreground">
                AI Evaluation
              </p>
              <dl className="mt-3 space-y-1.5 text-[0.97rem]">
                <div className="flex gap-2">
                  <dt className="w-56 shrink-0 text-muted-foreground">Technical understanding</dt>
                  <dd className="font-medium">Good</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-56 shrink-0 text-muted-foreground">Clarity</dt>
                  <dd className="font-medium">Good</dd>
                </div>
              </dl>
              <p className="mt-4 text-muted-foreground">Improvement suggestion</p>
              <p className="mt-1">
                "The answer could be stronger by discussing insertion and deletion complexity, and
                how memory is allocated in each case."
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
              <p className="font-mono text-[0.72rem] uppercase tracking-widest text-primary">
                AI Interviewer — follow-up
              </p>
              <p className="mt-2">
                "What would you choose if frequent insertion and deletion were required? Why?"
              </p>
            </div>
          </div>

          <p>
            That follow-up is the whole argument for this project. A static question bank would have
            moved on to an unrelated question. Here, the next question comes directly out of what
            the student left unsaid — which is much closer to how a real interview feels.
          </p>
          <Visual
            label="SCREENSHOT: Sample interview with feedback panel"
            caption="Visual 6 — a real session showing a question, the candidate's answer and the generated feedback."
          />
        </Section>

        <Section id="data" number="09" title="Data and Candidate Processing">
          <p>
            Before any AI work, the candidate data has to be readable. The pipeline is simple, but
            getting it right took longer than I expected.
          </p>
          <Flow
            steps={[
              "Candidate dataset",
              "Read JSONL / JSON data",
              "Parse candidate information",
              "Convert into structured data",
              "Use candidate information for interview processing",
            ]}
          />
          <p>
            JSONL means one JSON object per line, which is convenient for large datasets because you
            can read it record by record instead of loading everything at once. The backend reads
            these records, pulls out the fields that matter for an interview, and turns them into
            structured objects the rest of the application can work with.
          </p>
          <p>This part of the project taught me more than I anticipated about:</p>
          <Bullets
            items={[
              "Data formats and why line-delimited formats exist",
              "Parsing, and how much of real work is just reading data correctly",
              "Turning messy records into structured information",
              "Backend processing and where that logic belongs",
              "Connecting a data layer to an AI system in a predictable way",
            ]}
          />
          <Note>
            The candidate data used here is dataset material for development and testing. It is not
            a collection of real individuals' private information.
          </Note>
        </Section>

        <Section id="challenges" number="10" title="Challenges I Faced">
          <p>
            This is the section I would have found most useful when I started, so I am keeping it
            honest.
          </p>

          <SubHeading>Dataset processing</SubHeading>
          <p>
            Working with JSONL and compressed (GZIP) candidate data was my first real obstacle.
            Figuring out how to open, decompress and iterate through the records — and then confirm
            I was reading the right fields — took several attempts before anything downstream could
            work.
          </p>

          <SubHeading>Python environment</SubHeading>
          <p>
            Managing Python versions and virtual environments was a quiet time-sink. Getting the
            backend environment set up consistently was a lesson in itself.
          </p>

          <SubHeading>Backend development</SubHeading>
          <p>
            Setting up FastAPI, defining endpoints and getting the request and response shapes right
            was my introduction to actually designing an API instead of just consuming one.
          </p>

          <SubHeading>Frontend–backend integration</SubHeading>
          <p>
            Connecting React to the backend was where the two halves of the project finally met.
            Passing data back and forth over REST and handling what happens when a request does not
            return what the UI expects took real iteration.
          </p>

          <SubHeading>AI integration</SubHeading>
          <p>
            The biggest lesson: integrating Generative AI is not just calling an API. The harder
            parts were around it —
          </p>
          <Bullets
            items={[
              "Prompt design — how you ask determines how useful the output is",
              "Input and output handling — sending the right context, and using what comes back",
              "Error handling — deciding what the app does when a response is missing or unusable",
              "Making responses genuinely useful instead of long and vague",
              "Designing an experience that feels like an interview rather than a form",
            ]}
          />
        </Section>

        <Section id="learned" number="11" title="What I Learned">
          <p>Five things I would tell myself at the start of this project.</p>

          <SubHeading>1. Start with the problem</SubHeading>
          <p>
            I did not build this because Generative AI is popular. I built it because I could not
            get enough mock interview practice. Choosing the technology after understanding the
            problem made every later decision easier.
          </p>

          <SubHeading>2. AI is only one part of the system</SubHeading>
          <p>
            The model does the interesting work, but it is a small share of the code. A useful AI
            application still needs good data, backend logic, a user interface, APIs, an evaluation
            step and a coherent user experience. Remove any one of those and the AI does not matter.
          </p>

          <SubHeading>3. Building is different from planning</SubHeading>
          <p>
            On paper, "read candidate data and generate a question" is one line. In practice it is
            file formats, environments, endpoint design and prompt iteration. Nothing about that is
            a failure of planning — it is just what implementation is.
          </p>

          <SubHeading>4. Debugging is part of building</SubHeading>
          <p>
            Every error I hit forced me to understand a tool properly instead of copying a working
            snippet. I learned more from things breaking than from things running the first time.
          </p>

          <SubHeading>5. Start small and improve</SubHeading>
          <p>
            It was tempting to promise voice interviews, dashboards and adaptive difficulty. A
            working core loop — question, answer, feedback — is worth more than a long list of
            half-finished features, and it is also more honest.
          </p>
        </Section>

        <Section id="next" number="12" title="What's Next">
          <p>
            Everything in this section is a <strong>planned improvement</strong>, not a shipped
            feature.
          </p>

          <SubHeading>Real-time voice interviews (planned)</SubHeading>
          <p>
            The natural next step is letting the candidate speak instead of type, because speaking
            is what an actual interview requires. Conceptually:
          </p>
          <Flow
            steps={[
              "AI speaks",
              "Candidate speaks",
              "Speech recognition",
              "Gemini",
              "AI response",
              "Speech output",
            ]}
          />

          <SubHeading>More personalized interviews (planned)</SubHeading>
          <p>
            Combining resume information, the target job, the candidate's skills and their previous
            performance would let each session start where the last one ended, instead of resetting
            every time.
          </p>

          <SubHeading>Performance dashboard (planned)</SubHeading>
          <Bullets
            items={[
              "Interview history",
              "Technical performance across sessions",
              "Communication feedback over time",
              "Recurring weak areas",
              "Improvement trends",
            ]}
          />

          <SubHeading>Adaptive interviews (planned)</SubHeading>
          <p>
            Later questions could depend on earlier answers — going deeper when a student is
            confident, and easing back when they struggle. That is what would make a session feel
            like a conversation rather than a questionnaire.
          </p>
        </Section>

        <Section id="vision" number="13" title="The Bigger Vision">
          <p>The long-term goal is not:</p>
          <p className="font-mono text-sm text-muted-foreground">
            "Create an AI that asks interview questions."
          </p>
          <p>It is:</p>
          <Pull>Make quality interview practice more accessible to students.</Pull>
          <p>
            Good practice should not depend on which college you attend or whether you know someone
            in the industry. If a student can sit down, run a session, get specific feedback, and try
            again the next evening, that is already a meaningful improvement over practicing once
            and hoping for the best.
          </p>
          <p>
            I am not claiming this replaces mentorship or guarantees results. It is a place to
            repeat, notice your weak spots, and walk into the real interview having already said
            your answers out loud a few times.
          </p>
        </Section>

        <Section id="final" number="14" title="Final Thoughts">
          <p>Back to the question I started with:</p>
          <p className="font-display text-2xl text-ink">
            Can Generative AI make interview practice more accessible and personalized?
          </p>
          <p>
            From what I have built so far, I think it can help — as long as it is treated as
            practice and not as judgement. The model is good at generating relevant questions,
            reading a free-form answer and pointing out what was missing. It is not a reliable
            examiner, and I would not want a student to treat its feedback as a final assessment.
          </p>
          <p>
            The more surprising takeaway is how much of this project had nothing to do with AI:
            reading a dataset correctly, designing an endpoint, handling an unexpected response,
            making a screen that does not confuse the person using it.
          </p>
          <p className="font-display text-xl italic text-ink">
            This project is still evolving, but every feature, bug and experiment is teaching me how
            to turn an idea into a practical AI application.
          </p>
        </Section>

        {/* Links */}
        <section className="mt-16 rounded-lg border border-border bg-card p-6 shadow-soft">
          <h2 className="text-2xl text-ink">Project Links</h2>
          <dl className="mt-4 space-y-3 font-mono text-sm">
            {[
              ["GitHub", "[ADD GITHUB LINK]"],
              ["Live Demo", "[ADD LIVE DEMO LINK]"],
              ["Demo Video", "[ADD VIDEO LINK]"],
              ["LinkedIn", "[ADD LINKEDIN LINK]"],
            ].map(([label, placeholder]) => (
              <div key={label} className="flex flex-wrap gap-x-3">
                <dt className="w-28 shrink-0 text-muted-foreground">{label}</dt>
                <dd className="text-primary">{placeholder}</dd>
              </div>
            ))}
          </dl>
        </section>

        <footer className="rule-top mt-12 pt-6 text-sm text-muted-foreground">
          <p>
            Written by Pavithra A · Google Cloud Gen AI Academy — Cohort 3 · Meet the Builders, APAC
          </p>
        </footer>
      </div>
    </main>
  );
}
