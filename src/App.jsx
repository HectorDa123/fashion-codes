
import React, { useState } from "react";

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
  const [step, setStep] = useState("intro");
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    ubicacion: "",
    altura: "",
    genero: ""
  });
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [wardrobe, setWardrobe] = useState([]);

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
  };

  if (step === "intro") {
    return (
      <div className="p-4 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2933/2933186.png"
          alt="Logo EcoCloset"
          className="mx-auto w-24 h-24 mb-4"
        />
        <h1 className="text-3xl font-bold mb-6">👗 Fashion Codes</h1>
        <p className="text-gray-600 mb-4">Explora tu estilo, salva el planeta 🌍</p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-full text-lg" onClick={() => setStep("form")}>Comenzar</button>
      </div>
    );
  }

  if (step === "form") {
    return (
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold mb-2">👤 Información personal</h2>
        <input type="text" name="nombre" placeholder="Nombre" className="w-full border p-2 rounded" onChange={handleInputChange} />
        <input type="text" name="genero" placeholder="Género" className="w-full border p-2 rounded" onChange={handleInputChange} />
        <input type="number" name="edad" placeholder="Edad" className="w-full border p-2 rounded" onChange={handleInputChange} />
        <input type="text" name="ubicacion" placeholder="Ubicación" className="w-full border p-2 rounded" onChange={handleInputChange} />
        <input type="text" name="altura" placeholder="Altura (cm)" className="w-full border p-2 rounded" onChange={handleInputChange} />
        <button className="bg-green-500 text-white px-4 py-2 rounded mt-2" onClick={() => setStep("menu")}>Ir al menú</button>
      </div>
    );
  }

  const Menu = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">🏠 Menú principal</h2>
      <div className="flex flex-col gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setStep("styles")}>Elegir estilos</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setStep("wardrobe")}>Ver armario</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setStep("profile")}>Ver perfil</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setStep("tips")}>Tips ecológicos</button>
      </div>
    </div>
  );

  if (step === "menu") return <Menu />;

  if (step === "styles") {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">🎨 Elige tus estilos favoritos (máx 5):</h2>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {styles.map((style) => (
            <button
              key={style}
              className={`px-3 py-1 rounded-full border shadow-sm transition ${
                selectedStyles.includes(style)
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 hover:bg-green-100"
              }`}
              onClick={() => toggleStyle(style)}
            >
              {style}
            </button>
          ))}
        </div>
        <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setStep("menu")}>Volver al menú</button>
      </div>
    );
  }

  if (step === "wardrobe") {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">👚 Tu armario</h2>
        <input type="file" accept="image/*" onChange={handleAddClothing} className="mb-4" />
        <div className="grid grid-cols-2 gap-4">
          {wardrobe.map((item) => (
            <div key={item.id} className="border rounded p-2 text-center">
              <img src={item.image} alt="ropa" className="w-full h-40 object-cover rounded mb-2" />
              <p>Usos: {item.uses}</p>
              <button className="bg-green-500 text-white px-3 py-1 mt-2 rounded" onClick={() => incrementUses(item.id)}>Sumar uso</button>
            </div>
          ))}
        </div>
        <button className="bg-gray-400 text-white px-4 py-2 rounded mt-4" onClick={() => setStep("menu")}>Volver al menú</button>
      </div>
    );
  }

  if (step === "profile") {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">👤 Perfil</h2>
        <ul className="text-gray-800 space-y-1">
          <li><strong>Nombre:</strong> {formData.nombre}</li>
          <li><strong>Edad:</strong> {formData.edad}</li>
          <li><strong>Género:</strong> {formData.genero}</li>
          <li><strong>Ubicación:</strong> {formData.ubicacion}</li>
          <li><strong>Altura:</strong> {formData.altura} cm</li>
          <li><strong>Estilos favoritos:</strong> {selectedStyles.join(", ")}</li>
          <li><strong>Prendas registradas:</strong> {wardrobe.length}</li>
        </ul>
        <button className="bg-gray-400 text-white px-4 py-2 rounded mt-4" onClick={() => setStep("menu")}>Volver al menú</button>
      </div>
    );
  }

  if (step === "tips") {
    return (
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
        <button className="bg-gray-400 text-white px-4 py-2 rounded mt-4" onClick={() => setStep("menu")}>Volver al menú</button>
      </div>
    );
  }

  return null;
}
