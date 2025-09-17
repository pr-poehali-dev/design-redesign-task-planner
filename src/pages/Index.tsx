import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

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
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="CheckSquare" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TaskPlanner</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hover-scale">
                <Icon name="Bell" size={16} className="mr-2" />
                Уведомления
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover-scale">
                <Icon name="Plus" size={16} className="mr-2" />
                Новая задача
              </Button>
            </div>
          </div>
        </div>
      </header>

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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="glass-effect hover-scale">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего задач</CardTitle>
                  <Icon name="CheckSquare" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalTasks}</div>
                  <p className="text-xs text-muted-foreground">+2 с прошлой недели</p>
                </CardContent>
              </Card>

              <Card className="glass-effect hover-scale">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Завершено</CardTitle>
                  <Icon name="CheckCircle" className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(progressPercentage)}% от общего числа
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect hover-scale">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">В работе</CardTitle>
                  <Icon name="Clock" className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {tasks.filter(t => t.status === 'in_progress').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Активные задачи</p>
                </CardContent>
              </Card>

              <Card className="glass-effect hover-scale">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Просрочено</CardTitle>
                  <Icon name="AlertTriangle" className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">0</div>
                  <p className="text-xs text-muted-foreground">Отличная работа!</p>
                </CardContent>
              </Card>
            </div>

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
              {/* Add New Task */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Plus" size={20} />
                    <span>Новая задача</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Название задачи"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                  <Textarea
                    placeholder="Описание"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  />
                  <Input
                    placeholder="Проект"
                    value={newTask.project}
                    onChange={(e) => setNewTask({...newTask, project: e.target.value})}
                  />
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                  <Button onClick={addTask} className="w-full">
                    Добавить задачу
                  </Button>
                </CardContent>
              </Card>

              {/* Task List */}
              <div className="lg:col-span-2 space-y-4">
                {tasks.map((task) => (
                  <Card key={task.id} className="glass-effect hover-scale">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">{task.title}</h3>
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority === 'high' ? 'Высокий' : 
                               task.priority === 'medium' ? 'Средний' : 'Низкий'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{task.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Icon name="Folder" size={14} />
                              <span>{task.project}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="Calendar" size={14} />
                              <span>{task.dueDate}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
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
                    </CardContent>
                  </Card>
                ))}
              </div>
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