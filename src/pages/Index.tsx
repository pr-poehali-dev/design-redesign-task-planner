import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import TaskPlannerHeader from '@/components/TaskPlannerHeader';
import StatsCards from '@/components/StatsCards';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  project: string;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Подготовить презентацию',
    description: 'Создать слайды для встречи с клиентом',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2024-12-25',
    project: 'Проект Alpha'
  },
  {
    id: 2,
    title: 'Обновить документацию',
    description: 'Добавить новые разделы API',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-12-28',
    project: 'Проект Beta'
  },
  {
    id: 3,
    title: 'Провести код-ревью',
    description: 'Проверить pull request команды',
    status: 'completed',
    priority: 'high',
    dueDate: '2024-12-20',
    project: 'Проект Alpha'
  }
];

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    project: '',
    dueDate: ''
  });

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        status: 'pending',
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        project: newTask.project
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', priority: 'medium', project: '', dueDate: '' });
    }
  };

  const updateTaskStatus = (id: number, status: Task['status']) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status } : task));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <TaskPlannerHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation */}
          <TabsList className="grid w-full grid-cols-6 mb-8 glass-effect">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Icon name="Home" size={16} />
              <span>Главная</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={16} />
              <span>Задачи</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <Icon name="Folder" size={16} />
              <span>Проекты</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} />
              <span>Календарь</span>
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center space-x-2">
              <Icon name="BarChart3" size={16} />
              <span>Статистика</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Icon name="Settings" size={16} />
              <span>Настройки</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <StatsCards tasks={tasks} />

            {/* Progress Overview */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={20} />
                  <span>Общий прогресс</span>
                </CardTitle>
                <CardDescription>
                  Ваша продуктивность за текущий период
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Выполнено задач</span>
                    <span>{completedTasks} из {totalTasks}</span>
                  </div>
                  <Progress value={progressPercentage} className="w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Tasks */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="List" size={20} />
                  <span>Недавние задачи</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">{task.project}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority === 'high' ? 'Высокий' : 
                           task.priority === 'medium' ? 'Средний' : 'Низкий'}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateTaskStatus(task.id, 
                            task.status === 'completed' ? 'pending' : 'completed')}
                        >
                          {task.status === 'completed' ? 'Отменить' : 'Завершить'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <TaskForm 
                newTask={newTask}
                setNewTask={setNewTask}
                addTask={addTask}
              />
              <TaskList 
                tasks={tasks}
                updateTaskStatus={updateTaskStatus}
              />
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-effect hover-scale">
                <CardHeader>
                  <CardTitle>Проект Alpha</CardTitle>
                  <CardDescription>Разработка веб-приложения</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Прогресс</span>
                      <span>66%</span>
                    </div>
                    <Progress value={66} />
                    <p className="text-sm text-muted-foreground">2 из 3 задач завершено</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect hover-scale">
                <CardHeader>
                  <CardTitle>Проект Beta</CardTitle>
                  <CardDescription>Обновление API</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Прогресс</span>
                      <span>0%</span>
                    </div>
                    <Progress value={0} />
                    <p className="text-sm text-muted-foreground">0 из 1 задач завершено</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="animate-fade-in">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Calendar" size={20} />
                  <span>Календарь задач</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Icon name="Calendar" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Календарь в разработке</h3>
                  <p className="text-muted-foreground">
                    Скоро здесь появится интерактивный календарь с вашими задачами
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="BarChart3" size={20} />
                    <span>Статистика выполнения</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Завершено задач</span>
                      <span className="text-green-600 font-semibold">{completedTasks}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>В работе</span>
                      <span className="text-blue-600 font-semibold">
                        {tasks.filter(t => t.status === 'in_progress').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Ожидают</span>
                      <span className="text-gray-600 font-semibold">
                        {tasks.filter(t => t.status === 'pending').length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={20} />
                    <span>Продуктивность</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {Math.round(progressPercentage)}%
                    </div>
                    <p className="text-muted-foreground">
                      Общий прогресс выполнения задач
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="animate-fade-in">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Settings" size={20} />
                  <span>Настройки уведомлений</span>
                </CardTitle>
                <CardDescription>
                  Настройте push-уведомления о важных задачах и дедлайнах
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Уведомления о дедлайнах</h4>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления за день до крайнего срока
                    </p>
                  </div>
                  <Button variant="outline">
                    <Icon name="Bell" size={16} className="mr-2" />
                    Включить
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Важные задачи</h4>
                    <p className="text-sm text-muted-foreground">
                      Уведомления о задачах с высоким приоритетом
                    </p>
                  </div>
                  <Button variant="outline">
                    <Icon name="AlertTriangle" size={16} className="mr-2" />
                    Включить
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Ежедневный отчет</h4>
                    <p className="text-sm text-muted-foreground">
                      Сводка выполненных задач в конце дня
                    </p>
                  </div>
                  <Button variant="outline">
                    <Icon name="FileText" size={16} className="mr-2" />
                    Включить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}