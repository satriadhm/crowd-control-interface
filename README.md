# Sistem Antarmuka Kontrol Kualitas Crowd Worker

## 1. Landasan Teori

### 1.1 Crowdsourcing dan Quality Control Interface

Crowdsourcing adalah praktik mendapatkan kontribusi dari sekelompok besar orang melalui platform digital. Dalam konteks pengujian perangkat lunak, antarmuka pengguna (user interface) menjadi komponen kritis yang memungkinkan interaksi efektif antara pekerja crowdsourcing, validator, dan administrator sistem.

### 1.2 Arsitektur Frontend Modern

Sistem ini dibangun menggunakan arsitektur modern berbasis React dengan Next.js framework, mengimplementasikan prinsip-prinsip:

1. **Component-Based Architecture**: Modularitas tinggi dengan komponen yang dapat digunakan kembali
2. **Server-Side Rendering (SSR)**: Optimasi performa dan SEO
3. **Progressive Web Application**: Pengalaman pengguna yang responsif dan modern
4. **GraphQL Integration**: Komunikasi data yang efisien dengan backend

### 1.3 Manajemen State dan Autentikasi

Sistem mengimplementasikan manajemen state terpusat menggunakan Zustand dengan persistent storage:

```typescript
interface AuthState {
  userRole: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (role: string, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}
```

## 2. Metodologi

### 2.1 Arsitektur Sistem Frontend

Sistem ini dibangun menggunakan arsitektur modular dengan struktur sebagai berikut:

#### 2.1.1 Technology Stack
- **Next.js 15**: React framework dengan fitur App Router
- **TypeScript**: Type-safe development
- **Apollo Client**: GraphQL client untuk state management dan caching
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Advanced animations dan interactions
- **Zustand**: Lightweight state management

#### 2.1.2 Struktur Direktori

```
src/
├── app/                    # App Router pages (Next.js 13+)
│   ├── (admin)/           # Admin role pages
│   ├── (authentication)/  # Login/Register pages
│   ├── (validator)/       # Validator role pages
│   └── (worker)/          # Worker role pages
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── molecules/        # Composed components
│   └── organism/         # Complex components
├── graphql/              # GraphQL operations
│   ├── queries/          # GraphQL queries
│   ├── mutations/        # GraphQL mutations
│   └── types/           # TypeScript type definitions
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
└── store/              # State management
```

### 2.2 Role-Based Access Control (RBAC)

Sistem mengimplementasikan RBAC dengan empat peran utama:

#### 2.2.1 Worker Role
```typescript
// Worker capabilities
- Mengakses dashboard personal
- Melihat dan mengerjakan tugas testing
- Melihat status eligibility
- Mengakses profile dan test history
```

#### 2.2.2 Admin Role
```typescript
// Admin capabilities
- Manajemen pengguna (CRUD operations)
- Manajemen tugas (Task Management)
- Worker analysis dan reporting
- System configuration
```

#### 2.2.3 Validator Role
```typescript
// Validator capabilities
- Validasi pertanyaan/tugas
- Review content quality
- Approve/reject submissions
```

#### 2.2.4 Company Representative Role
```typescript
// Company Representative capabilities
- Monitoring project progress
- Accessing analytics dashboard
- Managing company-specific tasks
```

### 2.3 Komponen Antarmuka Utama

#### 2.3.1 Landing Page Professional

Landing page didesain dengan prinsip professional modern:

```typescript
// Key features highlight
const features = [
  {
    icon: <CogIcon className="h-8 w-8" />,
    title: "Advanced Testing Platform",
    description: "State-of-the-art crowdsourced testing infrastructure"
  },
  {
    icon: <CurrencyDollarIcon className="h-8 w-8" />,
    title: "Earn Rewards",
    description: "Get compensated for high-quality testing contributions"
  }
  // ... more features
];
```

#### 2.3.2 Dashboard Dinamis

Dashboard menyesuaikan konten berdasarkan role pengguna:

```typescript
// Role-based dashboard content
if (userData?.me.role === "admin") {
  return <AdminDashboard />;
} else if (userData?.me.role === "question_validator") {
  return <ValidatorDashboard />;
} else {
  return <WorkerDashboard />;
}
```

### 2.4 GraphQL Integration

#### 2.4.1 Struktur Queries

Sistem mengorganisir GraphQL operations berdasarkan domain:

```typescript
// Authentication Queries
export const GET_LOGGED_IN_USER = gql`
  query GetLoggedInUser($token: String!) {
    me(token: $token) {
      id
      isEligible
      completedTasks { taskId, answer }
      firstName
      lastName
      email
      role
    }
  }
`;

// Task Queries
export const GET_TASKS = gql`
  query GetTasks {
    getTasks {
      id
      title
      description
      question { scenario, given, when, then }
      isValidQuestion
      answers { answer }
    }
  }
`;
```

#### 2.4.2 Struktur Mutations

```typescript
// User Management Mutations
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      firstName
      lastName
      email
    }
  }
`;

// Task Management Mutations
export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      title
      description
      question { scenario, given, when, then }
      answers { answer }
    }
  }
`;
```

## 3. Fitur Sistem

### 3.1 Autentikasi dan Otorisasi

#### 3.1.1 Login System
```typescript
const onSubmit = async (input: LoginFormInputs) => {
  const response = await loginMutation({ variables: { input } });
  const { role, accessToken, refreshToken } = response.data.login;
  
  // Store tokens and redirect based on role
  Cookies.set("accessToken", accessToken);
  setAuth(role, accessToken, refreshToken);
  
  // Role-based routing
  if (role === "admin") router.push("/task-management");
  else if (role === "question_validator") router.push("/validate-question");
  else router.push("/dashboard");
};
```

#### 3.1.2 Protected Routes
Implementasi middleware untuk proteksi route berdasarkan autentikasi dan role.

### 3.2 Manajemen Pengguna (Admin)

#### 3.2.1 User Management Interface
```typescript
// User creation with role selection
const handleCreateUser = async () => {
  await createUser({
    variables: { 
      input: {
        firstName,
        lastName,
        email,
        role: selectedRole
      }
    }
  });
};
```

#### 3.2.2 User Analytics
- Distribusi pengguna berdasarkan role
- Status eligibility tracking
- Performance monitoring

### 3.3 Manajemen Tugas

#### 3.3.1 Task Creation Interface
```typescript
// Gherkin-style question format
interface TaskQuestion {
  scenario: string;
  given: string;
  when: string;
  then: string;
}

// Multiple choice answers
interface TaskAnswer {
  answer: string;
  stats?: number;
}
```

#### 3.3.2 Task Validation Workflow
- Question validator review process
- Approval/rejection system
- Feedback mechanism

### 3.4 Worker Dashboard

#### 3.4.1 Eligibility Status Display
```typescript
// Visual eligibility indicators
const EligibilityBadge = ({ status }: { status: boolean | null }) => {
  if (status === true) return <CheckCircle className="text-green-500" />;
  if (status === false) return <XCircle className="text-red-500" />;
  return <HelpCircle className="text-yellow-500" />;
};
```

#### 3.4.2 Progress Tracking
- Task completion history
- Accuracy metrics
- Reward tracking

### 3.5 Analytics dan Reporting

#### 3.5.1 Algorithm Performance Dashboard
```typescript
// Performance metrics visualization
export const GET_ALGORITHM_PERFORMANCE = gql`
  query GetAlgorithmPerformance {
    getAlgorithmPerformance {
      month
      accuracyRate
      responseTime
    }
  }
`;
```

#### 3.5.2 Data Visualization
- Interactive charts menggunakan Recharts
- Real-time data updates
- Export functionality (PDF, CSV)

## 4. Implementasi Teknis

### 4.1 Component Architecture

#### 4.1.1 Atomic Design Pattern
```typescript
// Atoms: Basic UI components
export function Button({ children, variant, ...props }) {
  return (
    <button 
      className={cn(buttonVariants({ variant }))} 
      {...props}
    >
      {children}
    </button>
  );
}

// Molecules: Composed components
export function LoginForm() {
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("email")} />
      <Input {...register("password")} />
      <Button type="submit">Login</Button>
    </form>
  );
}

// Organisms: Complex components
export function UserManagement() {
  const { data } = useQuery(GET_ALL_USERS);
  return (
    <div>
      <UserTable users={data.users} />
      <CreateUserModal />
    </div>
  );
}
```

#### 4.1.2 Custom Hooks
```typescript
// Reusable logic extraction
export function useRefreshSync() {
  // Sync logic for data refresh
  const refreshData = useCallback(() => {
    // Implementation
  }, []);
  
  return { refreshData };
}
```

### 4.2 State Management

#### 4.2.1 Zustand Store Configuration
```typescript
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userRole: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (role, accessToken, refreshToken) =>
        set({ userRole: role, accessToken, refreshToken }),
      clearAuth: () =>
        set({ userRole: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

#### 4.2.2 Apollo Client Setup
```typescript
// GraphQL client configuration
const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' }
  }
});
```

### 4.3 Styling dan UI/UX

#### 4.3.1 Design System
```css
/* Color scheme variables */
:root {
  --primary-color: #21074f;
  --secondary-color: #0c3981;
  --tertiary-color: #24ce2a;
  --tertiary-color-light: #25da9e;
}

/* Glass-morphism effects */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

#### 4.3.2 Responsive Design
- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions

### 4.4 Performance Optimizations

#### 4.4.1 Code Splitting
```typescript
// Dynamic imports untuk lazy loading
const AdminDashboard = dynamic(() => import('./AdminDashboard'));
const WorkerDashboard = dynamic(() => import('./WorkerDashboard'));
```

#### 4.4.2 Image Optimization
```typescript
// Next.js Image optimization
<Image
  src="/icons/login-illustration.svg"
  width={400}
  height={100}
  alt="Login illustration"
  priority={true}
/>
```

## 5. User Experience Design

### 5.1 Information Architecture

#### 5.1.1 Navigation Structure
```typescript
// Role-based navigation menus
const adminNavigation = [
  { label: "User Management", path: "/user-management" },
  { label: "Task Management", path: "/task-management" },
  { label: "Worker Analysis", path: "/worker-analysis" },
  { label: "Export Data", path: "/export-data" }
];

const workerNavigation = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Evaluation", path: "/eval" },
  { label: "Profile", path: "/profile" },
  { label: "Test Results", path: "/test-result" }
];
```

#### 5.1.2 Progressive Disclosure
- Context-sensitive information display
- Progressive form completion
- Conditional content based on user status

### 5.2 Interaction Design

#### 5.2.1 Micro-interactions
```typescript
// Framer Motion animations
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  <Button>Interactive Element</Button>
</motion.div>
```

#### 5.2.2 Feedback Systems
- Loading states untuk async operations
- Success/error notifications
- Progress indicators

### 5.3 Accessibility

#### 5.3.1 ARIA Implementation
```typescript
// Semantic HTML dan ARIA labels
<button
  aria-label="Create new user"
  aria-describedby="create-user-description"
  onClick={handleCreateUser}
>
  <UserPlus aria-hidden="true" />
  Create User
</button>
```

#### 5.3.2 Keyboard Navigation
- Focus management
- Escape key handling
- Tab order optimization

## 6. Testing dan Quality Assurance

### 6.1 Component Testing

#### 6.1.1 Unit Testing Strategy
```typescript
// Jest + React Testing Library
describe('LoginForm', () => {
  it('should handle form submission correctly', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockLoginMutation).toHaveBeenCalledWith({
        variables: { input: { email: 'test@example.com' } }
      });
    });
  });
});
```

#### 6.1.2 Integration Testing
- GraphQL operation testing
- Authentication flow testing
- Route protection testing

### 6.2 User Acceptance Testing

#### 6.2.1 Scenario-based Testing
```typescript
// User journey testing scenarios
const testScenarios = [
  {
    role: 'worker',
    journey: [
      'login',
      'view-dashboard',
      'select-task',
      'submit-answer',
      'check-eligibility'
    ]
  },
  {
    role: 'admin',
    journey: [
      'login',
      'create-user',
      'create-task',
      'monitor-analytics'
    ]
  }
];
```

## 7. Security Implementation

### 7.1 Authentication Security

#### 7.1.1 Token Management
```typescript
// Secure token storage
const tokenStorage = {
  setTokens: (access: string, refresh: string) => {
    Cookies.set("accessToken", access, { 
      expires: 1, 
      secure: true, 
      sameSite: 'strict' 
    });
    Cookies.set("refreshToken", refresh, { 
      expires: 7, 
      secure: true, 
      sameSite: 'strict' 
    });
  },
  clearTokens: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }
};
```

#### 7.1.2 Route Protection
```typescript
// Middleware untuk protected routes
export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');
  
  if (!token && isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### 7.2 Data Security

#### 7.2.1 Input Validation
```typescript
// Form validation dengan Yup schema
const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  role: yup.string().oneOf(['WORKER', 'ADMIN', 'VALIDATOR']).required()
});
```

#### 7.2.2 XSS Prevention
- Content sanitization
- CSP headers implementation
- Safe HTML rendering

## 8. Deployment dan DevOps

### 8.1 Build Configuration

#### 8.1.1 Next.js Configuration
```typescript
// next.config.ts
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'api.example.com']
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  }
};
```

#### 8.1.2 Environment Management
```bash
# Environment variables
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=production
```

### 8.2 Vercel Deployment

#### 8.2.1 Deployment Configuration
```json
{
  "builds": [
    { "src": "package.json", "use": "@vercel/next" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/" }
  ],
  "env": {
    "NEXT_PUBLIC_GRAPHQL_ENDPOINT": "@graphql-endpoint"
  }
}
```

#### 8.2.2 Performance Monitoring
- Bundle size analysis
- Core Web Vitals tracking
- Error monitoring dengan Sentry integration

## 9. Dokumentasi API Frontend

### 9.1 GraphQL Operations

#### 9.1.1 Authentication Operations
```graphql
# Login Mutation
mutation Login($input: LoginInput!) {
  login(input: $input) {
    role
    accessToken
    refreshToken
    userId
  }
}

# Get Current User Query
query GetLoggedInUser($token: String!) {
  me(token: $token) {
    id
    firstName
    lastName
    email
    role
    isEligible
    completedTasks { taskId, answer }
  }
}
```

#### 9.1.2 User Management Operations
```graphql
# Get All Users Query
query GetAllUsers($skip: Float, $take: Float) {
  getAllUsers(skip: $skip, take: $take) {
    id
    firstName
    lastName
    email
    role
    completedTasks { answer, taskId }
  }
}

# Create User Mutation
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    firstName
    lastName
    email
  }
}

# Delete User Mutation
mutation DeleteUser($id: String!) {
  deleteUser(id: $id) {
    firstName
    lastName
  }
}
```

#### 9.1.3 Task Management Operations
```graphql
# Get Tasks Query
query GetTasks {
  getTasks {
    id
    title
    description
    question {
      scenario
      given
      when
      then
    }
    isValidQuestion
    answers {
      answer
    }
  }
}

# Create Task Mutation
mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    title
    description
    question {
      scenario
      given
      when
      then
    }
    answers {
      answer
    }
  }
}

# Validate Task Mutation
mutation ValidateTask($id: String!) {
  validateQuestionTask(id: $id) {
    title
    description
    isValidQuestion
  }
}
```

#### 9.1.4 Analytics dan Monitoring
```graphql
# Get Dashboard Summary
query GetDashboardSummary {
  getDashboardSummary {
    iterationMetrics {
      iteration
      workers
      tasks
    }
    workerEligibility {
      name
      value
    }
    taskValidation {
      name
      value
    }
    accuracyDistribution {
      name
      value
    }
  }
}

# Get Algorithm Performance
query GetAlgorithmPerformance {
  getAlgorithmPerformance {
    month
    accuracyRate
    responseTime
  }
}

# Get Eligibility History
query GetTestHistory($workerId: String!) {
  getTestHistory(workerId: $workerId) {
    id
    testId
    score
    feedback
    createdAt
  }
}
```

#### 9.1.5 M-X Algorithm Operations
```graphql
# Submit Answer Mutation
mutation SubmitAnswer($input: CreateRecordedAnswerInput!) {
  submitAnswer(input: $input)
}

# Trigger Eligibility Update
mutation TriggerEligibilityUpdate {
  triggerEligibilityUpdate
}

# Get Test Results
query GetTestResults {
  getTestResults {
    id
    workerId
    testId
    score
    feedback
    eligibilityStatus
    createdAt
    formattedDate
  }
}
```

### 9.2 TypeScript Type Definitions

#### 9.2.1 User Types
```typescript
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isEligible: boolean;
  completedTasks: CompletedTask[];
}

export interface CompletedTask {
  taskId: string;
  answer: string;
  _id: string;
}

export interface LoginFormInputs {
  identifier: string;
  password: string;
}
```

#### 9.2.2 Task Types
```typescript
export interface Task {
  id: string;
  title: string;
  description: string;
  question: {
    scenario: string;
    given: string;
    when: string;
    then: string;
  };
  isValidQuestion: boolean;
  answers: Array<{
    answerId: number;
    answer: string;
    stats: number | null;
  }>;
}

export type CreateTask = {
  title: string;
  description: string;
  question: {
    scenario: string;
    given: string;
    when: string;
    then: string;
  };
  answers: { answer: string }[];
};
```

#### 9.2.3 Analytics Types
```typescript
export interface AlgorithmPerformanceData {
  month: string;
  accuracyRate: number;
  responseTime: number;
}

export interface TestResult {
  id: string;
  workerId: string;
  testId: string;
  score: number;
  feedback: string;
  eligibilityStatus: boolean;
  createdAt: string;
  formattedDate: string;
}

export interface DashboardSummary {
  iterationMetrics: Array<{
    iteration: number;
    workers: number;
    tasks: number;
  }>;
  workerEligibility: Array<{
    name: string;
    value: number;
  }>;
  taskValidation: Array<{
    name: string;
    value: number;
  }>;
  accuracyDistribution: Array<{
    name: string;
    value: number;
  }>;
}
```

## 10. Panduan Penggunaan

### 10.1 Setup Development Environment

#### 10.1.1 Prerequisites
```bash
# Node.js version
node --version  # v18.0.0 atau lebih tinggi

# Package manager
npm --version   # v8.0.0 atau lebih tinggi
```

#### 10.1.2 Installation Steps
```bash
# Clone repository
git clone https://github.com/satriadhm/crowd-control-interface.git
cd crowd-control-interface

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan konfigurasi yang sesuai

# Start development server
npm run dev
```

### 10.2 User Guides

#### 10.2.1 Admin User Guide
1. **Login sebagai Admin**
   - Akses halaman `/login`
   - Masukkan kredensial admin
   - Sistem akan redirect ke `/task-management`

2. **Manajemen Pengguna**
   - Navigasi ke "User Management"
   - Gunakan tombol "Create User" untuk menambah pengguna baru
   - View/Edit/Delete pengguna existing

3. **Manajemen Tugas**
   - Navigasi ke "Task Management"
   - Create task dengan format Gherkin
   - Monitor status validasi task

#### 10.2.2 Worker User Guide
1. **Registration dan Login**
   - Akses halaman `/register`
   - Pilih role "Worker"
   - Complete profile information
   - Login dan akses dashboard

2. **Mengerjakan Tugas**
   - View available tasks di dashboard
   - Klik "Start Testing" untuk memulai
   - Submit jawaban sesuai instruksi
   - Monitor eligibility status

3. **Tracking Progress**
   - Check test history di profile
   - Monitor accuracy metrics
   - View rewards earned

#### 10.2.3 Validator User Guide
1. **Question Validation**
   - Access validation queue
   - Review question quality
   - Approve/reject dengan feedback
   - Monitor validation metrics

## 11. Future Enhancements

### 11.1 Planned Features

#### 11.1.1 Real-time Collaboration
- WebSocket integration untuk live updates
- Real-time notification system
- Collaborative task working

#### 11.1.2 Advanced Analytics
- Machine learning insights
- Predictive modeling untuk worker performance
- Advanced data visualization

### 11.2 Technical Roadmap

#### 11.2.1 Performance Improvements
- Service Worker implementation
- Edge caching strategies
- Progressive Web App features

#### 11.2.2 Accessibility Enhancements
- Voice navigation support
- Multi-language internationalization
- Enhanced keyboard shortcuts

## 12. Kesimpulan

Sistem antarmuka crowd worker control ini berhasil mengimplementasikan solusi frontend modern dengan karakteristik:

### 12.1 Pencapaian Utama

1. **User Experience Excellence**: Interface yang intuitif dan responsif untuk semua role pengguna
2. **Technical Performance**: Optimasi loading time dan responsive design
3. **Scalable Architecture**: Struktur modular yang mudah di-maintain dan dikembangkan
4. **Security Implementation**: Implementasi keamanan yang robust untuk autentikasi dan otorisasi

### 12.2 Impact Akademis

1. **Educational Value**: Platform pembelajaran untuk modern web development practices
2. **Research Platform**: Foundation untuk penelitian UX/UI dalam crowdsourcing systems
3. **Industry Application**: Template untuk enterprise-level crowdsourcing applications

### 12.3 Technical Excellence

1. **Modern Stack Implementation**: Next.js 15, TypeScript, GraphQL integration
2. **Performance Optimization**: Code splitting, caching, dan bundle optimization
3. **Accessibility Compliance**: WCAG guidelines adherence
4. **Responsive Design**: Mobile-first approach dengan progressive enhancement

---

## Setup dan Instalasi

### Prasyarat

- Node.js (v18 atau lebih tinggi)
- npm atau yarn package manager
- Git untuk version control

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/satriadhm/crowd-control-interface.git
   cd crowd-control-interface
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local dengan konfigurasi backend
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build untuk production**
   ```bash
   npm run build
   npm start
   ```

### Akses Aplikasi

- **Development**: `http://localhost:3000`
- **Production**: Deployed URL pada Vercel

---

**Lisensi**: Proyek ini dikembangkan untuk keperluan akademis sebagai bagian dari Tugas Akhir di Telkom University.

**Penulis**: Glorious Satria Dhamang Aji  
**NIM**: 1302213015  
**Program Studi**: S1 Rekayasa Perangkat Lunak  
**Universitas**: Telkom University  
**Tahun**: 2025

**Repository**: [https://github.com/satriadhm/crowd-control-interface](https://github.com/satriadhm/crowd-control-interface)
