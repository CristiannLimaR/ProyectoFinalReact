import { useNavigate, useParams } from "react-router-dom";
import { useHabitsContext } from "../context/HabitsContext";
import HabitForm from "../components/habits/HabitForm";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const HabitFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { habits, dispatch } = useHabitsContext();
  
  const habit = id ? habits.find(h => h.id === parseInt(id)) : null;

  const handleSubmit = (formData) => {
    try {
      if (id) {
        dispatch({
          type: "UPDATE_HABIT",
          payload: {
            id: parseInt(id),
            data: formData
          }
        });
      } else {
        dispatch({
          type: "ADD_HABIT",
          payload: {
            ...formData,
            days: Array(7).fill(false),
            streak: 0,
            completedDays: {}
          }
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error al guardar el hábito:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{id ? "Editar Hábito" : "Nuevo Hábito"}</CardTitle>
        </CardHeader>
        <CardContent>
          <HabitForm
            initialData={habit}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default HabitFormPage; 