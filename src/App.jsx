
import React, { useState, useEffect } from "react";

const styles = [
  "Vintage",
  "Streetwear",
  "Emo",
  "Oversize",
  "Y2K",
  "Boho",
  "Grunge",
  "Minimalista",
  "Chic",
  "Preppy",
  "Deportivo",
  "Formal",
  "Casual",
  "Gótico",
  "Artsy"
];

export default function StyleSelector() {
  const [activeTab, setActiveTab] = useState("wardrobe"); // Navegación por pestañas
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("formData")) || {
      nombre: "",
      edad: "",
      ubicacion: "",
      altura: "",
      genero: ""
    }
  );
  const [selectedStyles, setSelectedStyles] = useState(
    JSON.parse(localStorage.getItem("selectedStyles")) || []
  );
  const [wardrobe, setWardrobe] = useState(
    JSON.parse(localStorage.getItem("wardrobe")) || []
  );
  const [points, setPoints] = useState(
    parseInt(localStorage.getItem("points"), 10) || 0
  );

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("selectedStyles", JSON.stringify(selectedStyles));
    localStorage.setItem("wardrobe", JSON.stringify(wardrobe));
    localStorage.setItem("points", points.toString());
  }, [formData, selectedStyles, wardrobe, points]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleStyle = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else if (selectedStyles.length < 5) {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const handleAddClothing = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newClothing = {
        id: Date.now(),
        image: URL.createObjectURL(file),
        uses: 0
      };
      setWardrobe([...wardrobe, newClothing]);
    }
  };

  const incrementUses = (id) => {
    setWardrobe(
      wardrobe.map((item) =>
        item.id === id ? { ...item, uses: item.uses + 1 } : item
      )
    );
    setPoints(points + 10); // Recompensa por cada uso adicional
  };

  const renderWardrobe = () => (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">👚 Tu armario</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleAddClothing}
        className="mb-4"
      />
      <div className="grid grid-cols-2 gap-4">
        {wardrobe.map((item) => (
          <div key={item.id} className="border rounded p-2 text-center">
            <img
              src={item.image}
              alt="ropa"
              className="w-full h-40 object-cover rounded mb-2"
            />
            <p>Usos: {item.uses}</p>
            <button
              className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
              onClick={() => incrementUses(item.id)}
            >
              Sumar uso
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">👤 Tu perfil</h2>
      <ul className="text-gray-800 space-y-1">
        <li>
          <strong>Nombre:</strong> {formData.nombre}
        </li>
        <li>
          <strong>Edad:</strong> {formData.edad}
        </li>
        <li>
          <strong>Género:</strong> {formData.genero}
        </li>
        <li>
          <strong>Ubicación:</strong> {formData.ubicacion}
        </li>
        <li>
          <strong>Altura:</strong> {formData.altura} cm
        </li>
        <li>
          <strong>Estilos favoritos:</strong> {selectedStyles.join(", ")}
        </li>
        <li>
          <strong>Prendas registradas:</strong> {wardrobe.length}
        </li>
        <li>
          <strong>Puntos:</strong> {points}
        </li>
      </ul>
    </div>
  );

  const renderTips = () => (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">🌱 Tips y Reflexión</h2>
      <ul className="list-disc space-y-2 pl-5 text-gray-700">
        <li>Reutiliza y repara tu ropa antes de desecharla.</li>
        <li>Compra en tiendas de segunda mano o intercambia prendas.</li>
        <li>Evita las compras impulsivas, planifica tus outfits.</li>
        <li>Lava tu ropa con agua fría y cuídala para alargar su vida útil.</li>
        <li>Infórmate sobre el impacto del fast fashion en el medio ambiente.</li>
        <li>Valora la ropa como una forma de expresión y no como algo desechable.</li>
      </ul>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setPoints(points + 20)} // Recompensa por leer los tips
      >
        Marcar como leído (+20 puntos)
      </button>
    </div>
  );

  return (
    <div>
      <nav className="flex justify-around bg-gray-200 p-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "wardrobe" ? "bg-green-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("wardrobe")}
        >
          Ropa
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "profile" ? "bg-green-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Perfil
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "tips" ? "bg-green-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("tips")}
        >
          Recomendaciones
        </button>
      </nav>
      {activeTab === "wardrobe" && renderWardrobe()}
      {activeTab === "profile" && renderProfile()}
      {activeTab === "tips" && renderTips()}
    </div>
  );
}