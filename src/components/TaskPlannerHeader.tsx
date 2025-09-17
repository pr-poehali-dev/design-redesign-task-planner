import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function TaskPlannerHeader() {
  return (
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
  );
}