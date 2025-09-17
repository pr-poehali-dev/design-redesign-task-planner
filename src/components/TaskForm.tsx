import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

interface TaskFormProps {
  newTask: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    project: string;
    dueDate: string;
  };
  setNewTask: (task: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    project: string;
    dueDate: string;
  }) => void;
  addTask: () => void;
}

export default function TaskForm({ newTask, setNewTask, addTask }: TaskFormProps) {
  return (
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
  );
}