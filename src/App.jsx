
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
  const [step, setStep] = useState(0);
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

  if (step === 0) {
    return (
      <div className="p-4 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2933/2933186.png"
          alt="Logo EcoCloset"
          className="mx-auto w-24 h-24 mb-4"
        />
        <h1 className="text-3xl font-bold mb-6">👗 Fashion Codes</h1>
        <p className="text-gray-600 mb-4">Explora tu estilo, salva el planeta 🌍</p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-full text-lg" onClick={() => setStep(1)}>
          Comenzar
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold mb-2">👤 Información personal</h2>
        <input type="text" name="nombre" placeholder="Nombre" className="w-full border p-2 rounded" onChange={handleInputChange} />
        <input type="text" name="genero" placeholder="Género" className="w-full border p-2 rounded" onChange={handleInputChange} />
        <input type="number" name="edad" placeholder="Edad" className="w-full border p-2 rounded" onChange={handleInputChange} />
        <input type="text" name="ubicacion" placeholder="Ubicación" className="w-full border p-2 rounded" onChange={handleInputChange} />
        <input type="text" name="altura" placeholder="Altura (cm)" className="w-full border p-2 rounded" onChange={handleInputChange} />
        <button className="bg-green-500 text-white px-4 py-2 rounded mt-2" onClick={() => setStep(2)}>Siguiente</button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">🎨 Elige tus estilos favoritos (máx 5):</h2>
        <div className="mb-4">
          <ul className="text-sm text-gray-800 list-disc pl-6 space-y-2">
            <li><strong>Vintage:</strong> Jeans rectos, camisas retro, chaquetas de los 80s.</li>
            <li><strong>Streetwear:</strong> Hoodies anchos, zapatillas deportivas, pantalones cargo.</li>
            <li><strong>Emo:</strong> Camisetas negras con estampados, pantalones ajustados, accesorios con púas.</li>
            <li><strong>Oversize:</strong> Polos largos, blazers grandes, joggers holgados.</li>
            <li><strong>Y2K:</strong> Crop tops, gafas de colores, pantalones con brillo o metálicos.</li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {styles.map((style) => (
            <button
              key={style}
              className={`px-3 py-1 rounded-full border shadow-sm transition ${selectedStyles.includes(style) ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-green-100"}`}
              onClick={() => toggleStyle(style)}
            >
              {style}
            </button>
          ))}
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setStep(3)}>Siguiente</button>
      </div>
    );
  }

  return null;
}
