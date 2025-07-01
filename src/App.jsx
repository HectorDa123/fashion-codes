import { useState } from "react";

export default function App() {
  const [userData, setUserData] = useState({ name: "", gender: "", height: "", age: "", location: "" });
  const [submitted, setSubmitted] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [newCloth, setNewCloth] = useState("");
  const [newImage, setNewImage] = useState(null);

  const styles = [
    "Emo", "Oversize", "Vintage", "Streetwear", "Minimalista", "Y2K", "Deportivo",
    "Casual", "Formal", "Boho", "Preppy", "Skater", "Grunge", "Techwear", "Artsy",
    "Gótico", "Cottagecore", "Normcore"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleStyle = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else if (selectedStyles.length < 5) {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addCloth = () => {
    if (newCloth.trim()) {
      const simulatedImageAnalysis = () => {
        const keywords = ["denim", "chaqueta", "falda", "camisa", "crop", "sudadera", "blazer", "hoodie"];
        const matched = keywords.filter(k => newCloth.toLowerCase().includes(k));
        if (matched.some(k => ["denim", "chaqueta", "falda"].includes(k))) return ["Vintage", "Y2K"];
        if (matched.some(k => ["sudadera", "hoodie"].includes(k))) return ["Streetwear", "Oversize"];
        if (matched.some(k => ["blazer"].includes(k))) return ["Formal", "Minimalista"];
        return ["Casual"];
      };
      const autoStyles = simulatedImageAnalysis();
      setClothes([...clothes, { name: newCloth, uses: 0, image: newImage, suggestedStyles: autoStyles }]);
      setNewCloth("");
      setNewImage(null);
    }
  };

  const increaseUse = (index) => {
    const updated = [...clothes];
    updated[index].uses += 1;
    setClothes(updated);
  };

  const getSustainabilityAdvice = (uses) => {
    if (uses === 0) return "🌑 No se ha usado. ¡Dale vida!";
    if (uses < 5) return "🌱 Poco uso. Úsalo más antes de comprar.";
    return "💚 Bien usado. ¡Sigue así!";
  };

  const tips = [
    "Lava con agua fría para ahorrar energía.",
    "Compra ropa de segunda mano.",
    "Repara antes de desechar.",
    "Haz trueques con amigos.",
    "Evita comprar por impulso."
  ];

  const styleRecommendations = {
    Emo: ["Gótico", "Grunge"],
    Vintage: ["Boho", "Cottagecore"],
    Streetwear: ["Skater", "Techwear"],
    Oversize: ["Casual", "Y2K"],
    Formal: ["Preppy", "Minimalista"],
    Y2K: ["Artsy", "Oversize"],
    Boho: ["Vintage", "Cottagecore"],
    Gótico: ["Emo", "Grunge"],
    Skater: ["Streetwear", "Grunge"],
    Preppy: ["Minimalista", "Formal"],
    Normcore: ["Minimalista", "Casual"]
  };

  const getCombinedStyles = () => {
    const suggestions = new Set();
    selectedStyles.forEach(style => {
      (styleRecommendations[style] || []).forEach(s => suggestions.add(s));
    });
    selectedStyles.forEach(s => suggestions.delete(s));
    return Array.from(suggestions).slice(0, 3);
  };

  const containerStyle = "min-h-screen bg-gradient-to-b from-pink-100 via-white to-green-100 p-4 overflow-y-auto max-h-screen";
  const cardStyle = "bg-white shadow-xl rounded-2xl p-4 max-w-md mx-auto text-center border border-gray-200";

  if (!submitted) {
    return (
      <div className={containerStyle}>
        <div className={cardStyle}>
          <h1 className="text-3xl font-extrabold mb-4 text-green-700">🌿 ¡Bienvenido a Fashion Codes!</h1>
          <p className="text-sm mb-4 text-gray-600">Descubre tu estilo y salva el planeta con cada outfit ✨</p>
          <input name="name" placeholder="Nombre" onChange={handleInputChange} className="border p-2 w-full mb-2 rounded" />
          <input name="gender" placeholder="Género" onChange={handleInputChange} className="border p-2 w-full mb-2 rounded" />
          <input name="height" placeholder="Altura (cm)" onChange={handleInputChange} className="border p-2 w-full mb-2 rounded" />
          <input name="age" placeholder="Edad" onChange={handleInputChange} className="border p-2 w-full mb-2 rounded" />
          <input name="location" placeholder="Ubicación" onChange={handleInputChange} className="border p-2 w-full mb-4 rounded" />

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

          <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transition" onClick={() => setSubmitted(true)}>
            🚪 Entrar a la app
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={containerStyle}>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <div className={cardStyle}>
        <h1 className="text-3xl font-extrabold mb-2 text-green-700">Fashion Codes</h1>
        <p className="text-sm mb-4 text-gray-600">Hola, {userData.name} 👋</p>
        <p className="text-sm text-gray-600 mb-4">Edad: {userData.age} | Altura: {userData.height}cm | Estilo: {selectedStyles.join(", ")}</p>

        <input type="text" placeholder="Agrega una prenda" className="border p-2 w-full mb-2 rounded" value={newCloth} onChange={(e) => setNewCloth(e.target.value)} />
        <input type="file" accept="image/*" className="w-full mb-2" onChange={handleImageUpload} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={addCloth}>Agregar</button>

        <ul className="mt-2 text-left">
          {clothes.map((item, index) => (
            <li key={index} className="border p-2 mb-4 rounded-lg bg-gray-50 shadow-sm">
              {item.image && <img src={item.image} alt="Prenda" className="w-full h-40 object-cover rounded mb-2" />}
              <div className="flex justify-between w-full mb-1">
                <span className="font-medium">{item.name}</span>
                <button className="bg-blue-400 text-white px-2 py-1 rounded" onClick={() => increaseUse(index)}>+1 uso</button>
              </div>
              <p className="text-sm">Usos: {item.uses}</p>
              <p className="text-xs text-gray-600 italic">{getSustainabilityAdvice(item.uses)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold mb-2">💡 Tips sostenibles</h2>
          <ul className="list-disc pl-5 text-sm text-green-800">
            {tips.map((tip, index) => (<li key={index}>{tip}</li>))}
          </ul>
        </div>

        <div className="mt-6 text-left text-sm text-gray-700">
          <h2 className="text-lg font-semibold mb-2">🧠 Reflexión</h2>
          <p>El fast fashion impacta negativamente al planeta 🌍. Consumir de forma responsable no solo ayuda al medio ambiente, sino también a las personas detrás de la producción de la ropa. ¿Realmente necesitas una prenda nueva?</p>
        </div>

        <div className="mt-6 text-left text-sm text-gray-700 animate-fadeIn">
          <h2 className="text-lg font-semibold mb-2">✨ Estilos que podrías combinar</h2>
          <ul className="list-disc pl-5 mb-4">
            {getCombinedStyles().map((style, idx) => (
              <li key={idx}><strong>{style}</strong> – Complementa tu estilo actual</li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mb-2">🛍️ Tiendas recomendadas cerca de {userData.location}</h2>
          <ul className="list-disc pl-5 mb-4">
            <li><strong>EcoModa {userData.location}</strong> – Tienda sostenible con ropa vintage y reciclada</li>
            <li><strong>ReDress</strong> – Moda consciente y de segunda mano</li>
            <li><strong>Tu Estilo Circular</strong> – Talleres de trueque y reparación de ropa</li>
          </ul>

          {clothes.some(c => c.suggestedStyles?.length) && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">🔍 Sugerencias de estilo basadas en tus prendas</h2>
              <ul className="list-disc pl-5">
                {clothes.map((item, idx) => (
                  item.suggestedStyles?.length > 0 && (
                    <li key={idx}>
                      <strong>{item.name}</strong>: {item.suggestedStyles.join(", ")}.
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
