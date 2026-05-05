CREATE DATABASE IF NOT EXISTS lannent;
USE lannent;

-- ============================================================================
-- LANNENT DATABASE SCHEMA
-- Aligned with project_schema.md — 11 tables, 155+ attributes
-- Updated: 2026-05-04
-- ============================================================================

-- 1. USERS (Base — shared attributes for ALL roles)
CREATE TABLE USERS (
  id              VARCHAR(50)  PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  email           VARCHAR(150) NOT NULL UNIQUE,
  password        VARCHAR(255) NOT NULL,
  role            ENUM('client','worker','expert','superuser') NOT NULL,
  avatar          VARCHAR(10),
  avatarColor     VARCHAR(200),
  status          VARCHAR(20)  DEFAULT 'active',
  joinDate        VARCHAR(50),
  walletBalance   DECIMAL(10,2) DEFAULT 0
);

-- 1a. CLIENTS (EER Specialization — 1:1 with USERS where role='client')
CREATE TABLE CLIENTS (
  userId          VARCHAR(50) PRIMARY KEY,
  company         VARCHAR(200),
  location        VARCHAR(200),
  FOREIGN KEY (userId) REFERENCES USERS(id) ON DELETE CASCADE
);

-- 1b. WORKERS (EER Specialization — 1:1 with USERS where role='worker')
CREATE TABLE WORKERS (
  userId            VARCHAR(50) PRIMARY KEY,
  location          VARCHAR(200),
  skills            JSON,
  rating            DECIMAL(3,1) DEFAULT 0,
  completedProjects INT DEFAULT 0,
  FOREIGN KEY (userId) REFERENCES USERS(id) ON DELETE CASCADE
);

-- 1c. EXPERTS (EER Specialization — 1:1 with USERS where role='expert')
CREATE TABLE EXPERTS (
  userId          VARCHAR(50) PRIMARY KEY,
  specialization  VARCHAR(200),
  reviewsDone     INT DEFAULT 0,
  FOREIGN KEY (userId) REFERENCES USERS(id) ON DELETE CASCADE
);

-- 2. TASKS (Projects)
CREATE TABLE TASKS (
  id              VARCHAR(50)  PRIMARY KEY,
  title           VARCHAR(200) NOT NULL,
  description     TEXT         NOT NULL,
  category        VARCHAR(100) NOT NULL,
  budget          DECIMAL(10,2) NOT NULL CHECK (budget >= 1),
  currency        VARCHAR(10)  DEFAULT 'USD',
  deadline        VARCHAR(20),
  skills          JSON,
  clientId        VARCHAR(50)  NOT NULL,
  workerId        VARCHAR(50),
  status          ENUM('open','in-progress','completed','cancelled') DEFAULT 'open',
  auditEnabled    BOOLEAN      DEFAULT FALSE,
  progress        INT          DEFAULT 0,
  createdAt       VARCHAR(20)  NOT NULL,
  FOREIGN KEY (clientId) REFERENCES USERS(id),
  FOREIGN KEY (workerId) REFERENCES USERS(id)
);

-- 3. MILESTONES
CREATE TABLE MILESTONES (
  id              VARCHAR(50)  PRIMARY KEY,
  taskId          VARCHAR(50)  NOT NULL,
  title           VARCHAR(200) NOT NULL,
  description     TEXT,
  budget          DECIMAL(10,2) NOT NULL CHECK (budget >= 1),
  status          ENUM('pending','in-progress','submitted','completed') DEFAULT 'pending',
  workerId        VARCHAR(50),
  dueDate         VARCHAR(20),
  priority        ENUM('High','Medium','Low') DEFAULT 'Medium',
  progress        INT          DEFAULT 0,
  submittedAt     VARCHAR(20),
  approvedAt      VARCHAR(20),
  deliverable     JSON,
  FOREIGN KEY (taskId)   REFERENCES TASKS(id),
  FOREIGN KEY (workerId) REFERENCES USERS(id)
);

-- 4. PROPOSALS
CREATE TABLE PROPOSALS (
  id              VARCHAR(50)  PRIMARY KEY,
  taskId          VARCHAR(50)  NOT NULL,
  workerId        VARCHAR(50)  NOT NULL,
  workerName      VARCHAR(100),
  avatar          VARCHAR(10),
  avatarColor     VARCHAR(200),
  rating          DECIMAL(3,1),
  reviewCount     INT,
  location        VARCHAR(200),
  bidPrice        VARCHAR(50),
  timeline        VARCHAR(50),
  coverLetter     TEXT,
  skills          JSON,
  completedProjects INT,
  successRate     INT,
  hourlyRate      VARCHAR(20),
  responseTime    VARCHAR(50),
  status          ENUM('pending','hired','rejected') DEFAULT 'pending',
  type            ENUM('proposal','invitation') DEFAULT 'proposal',
  createdAt       VARCHAR(20) NOT NULL,
  FOREIGN KEY (taskId)   REFERENCES TASKS(id),
  FOREIGN KEY (workerId) REFERENCES USERS(id)
);

-- 5. AUDIT_REQUESTS
CREATE TABLE AUDIT_REQUESTS (
  id              VARCHAR(50)  PRIMARY KEY,
  taskId          VARCHAR(50)  NOT NULL,
  milestoneId     VARCHAR(50)  NOT NULL,
  workerId        VARCHAR(50)  NOT NULL,
  clientId        VARCHAR(50)  NOT NULL,
  expertId        VARCHAR(50),
  status          VARCHAR(20)  DEFAULT 'Pending',
  severity        ENUM('High','Medium','Low'),
  project         VARCHAR(200),
  worker          VARCHAR(100),
  milestone       VARCHAR(200),
  createdAt       VARCHAR(20) NOT NULL,
  dueDate         VARCHAR(20),
  FOREIGN KEY (taskId)      REFERENCES TASKS(id),
  FOREIGN KEY (milestoneId) REFERENCES MILESTONES(id),
  FOREIGN KEY (workerId)    REFERENCES USERS(id),
  FOREIGN KEY (clientId)    REFERENCES USERS(id),
  FOREIGN KEY (expertId)    REFERENCES USERS(id)
);

-- 6. AUDIT_REPORTS
CREATE TABLE AUDIT_REPORTS (
  id              VARCHAR(50)  PRIMARY KEY,
  auditRequestId  VARCHAR(50)  NOT NULL,
  taskId          VARCHAR(50)  NOT NULL,
  milestoneId     VARCHAR(50)  NOT NULL,
  expertId        VARCHAR(50)  NOT NULL,
  verdict         ENUM('pass','fail','conditional'),
  overall         VARCHAR(20),
  findings        TEXT,
  codequality     INT CHECK (codequality BETWEEN 0 AND 5),
  security        INT CHECK (security BETWEEN 0 AND 5),
  performance     INT CHECK (performance BETWEEN 0 AND 5),
  documentation   INT CHECK (documentation BETWEEN 0 AND 5),
  createdAt       VARCHAR(20) NOT NULL,
  milestoneTitle  VARCHAR(200),
  projectTitle    VARCHAR(200),
  workerName      VARCHAR(100),
  FOREIGN KEY (auditRequestId) REFERENCES AUDIT_REQUESTS(id),
  FOREIGN KEY (taskId)         REFERENCES TASKS(id),
  FOREIGN KEY (milestoneId)    REFERENCES MILESTONES(id),
  FOREIGN KEY (expertId)       REFERENCES USERS(id)
);

-- 7. DISPUTES
CREATE TABLE DISPUTES (
  id              VARCHAR(50)  PRIMARY KEY,
  taskId          VARCHAR(50)  NOT NULL,
  milestoneId     VARCHAR(50),
  raisedBy        VARCHAR(50)  NOT NULL,
  raisedByName    VARCHAR(100),
  againstId       VARCHAR(50)  NOT NULL,
  againstName     VARCHAR(100),
  status          ENUM('open','resolved') DEFAULT 'open',
  reason          TEXT         NOT NULL,
  expertId        VARCHAR(50),
  verdict         ENUM('worker-favour','client-favour','split'),
  resolution      TEXT,
  amount          VARCHAR(50),
  project         VARCHAR(200),
  milestone       VARCHAR(200),
  createdAt       VARCHAR(20) NOT NULL,
  resolvedAt      VARCHAR(20),
  FOREIGN KEY (taskId)    REFERENCES TASKS(id),
  FOREIGN KEY (milestoneId) REFERENCES MILESTONES(id),
  FOREIGN KEY (raisedBy)  REFERENCES USERS(id),
  FOREIGN KEY (againstId) REFERENCES USERS(id),
  FOREIGN KEY (expertId)  REFERENCES USERS(id)
);

-- 8. TRANSACTIONS
CREATE TABLE TRANSACTIONS (
  id              VARCHAR(50)  PRIMARY KEY,
  type            ENUM('escrow-lock','milestone-release','deposit','refund','dispute-release') NOT NULL,
  amount          DECIMAL(10,2) NOT NULL,
  fromId          VARCHAR(50)  NOT NULL,
  toId            VARCHAR(50)  NOT NULL,
  taskId          VARCHAR(50),
  milestoneId     VARCHAR(50),
  description     TEXT,
  status          ENUM('pending','completed','failed') DEFAULT 'completed',
  createdAt       VARCHAR(20) NOT NULL,
  FOREIGN KEY (taskId)      REFERENCES TASKS(id),
  FOREIGN KEY (milestoneId) REFERENCES MILESTONES(id)
);

-- 9. NOTIFICATIONS
CREATE TABLE NOTIFICATIONS (
  id              VARCHAR(50)  PRIMARY KEY,
  userId          VARCHAR(50)  NOT NULL,
  type            VARCHAR(50)  NOT NULL,
  text            TEXT         NOT NULL,
  subtext         TEXT,
  read_status     BOOLEAN      DEFAULT FALSE,
  createdAt       VARCHAR(20) NOT NULL,
  FOREIGN KEY (userId) REFERENCES USERS(id)
);

-- 10. MESSAGES
-- Scoped to a project (task). Only the client and gig worker assigned to
-- that task can exchange messages through the Project Workroom.
-- Expert reviewers have NO messaging capability.
-- Constraints enforced at application level:
--   • senderId must be task.clientId OR task.workerId
--   • receiverId must be the OTHER party on the same task
--   • A notification is auto-generated for receiver on every message
CREATE TABLE MESSAGES (
  id              VARCHAR(50)  PRIMARY KEY,
  taskId          VARCHAR(50)  NOT NULL,
  senderId        VARCHAR(50)  NOT NULL,
  receiverId      VARCHAR(50)  NOT NULL,
  content         TEXT         NOT NULL,
  senderName      VARCHAR(100),
  senderAvatar    VARCHAR(10),
  senderAvatarColor VARCHAR(200),
  createdAt       VARCHAR(30) NOT NULL,
  FOREIGN KEY (taskId)     REFERENCES TASKS(id),
  FOREIGN KEY (senderId)   REFERENCES USERS(id),
  FOREIGN KEY (receiverId) REFERENCES USERS(id)
);

-- 11. EXPERT_APPLICATIONS
CREATE TABLE EXPERT_APPLICATIONS (
  id              VARCHAR(50)  PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  email           VARCHAR(150) NOT NULL,
  phone           VARCHAR(20),
  phoneCountry    VARCHAR(5),
  country         VARCHAR(100),
  expertise       VARCHAR(200),
  experience      VARCHAR(20),
  linkedin        VARCHAR(500),
  github          VARCHAR(500),
  motivation      TEXT,
  status          ENUM('pending','approved','rejected') DEFAULT 'pending',
  appliedAt       VARCHAR(20) NOT NULL,
  reviewedAt      VARCHAR(20),
  reviewedBy      VARCHAR(50),
  FOREIGN KEY (reviewedBy) REFERENCES USERS(id)
);
