import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

interface TaskListProps {
  tasks: Task[];
  updateTaskStatus: (id: number, status: Task['status']) => void;
}

export default function TaskList({ tasks, updateTaskStatus }: TaskListProps) {
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

  return (
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
  );
}