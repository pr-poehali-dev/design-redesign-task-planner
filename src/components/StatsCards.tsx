import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface StatsCardsProps {
  tasks: Task[];
}

export default function StatsCards({ tasks }: StatsCardsProps) {
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
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
  );
}