const Update =require('../models/update');
const axios=require('axios');
const geocodeIfEnabled = async (location) => {
  const key = process.env.REACT_APP_API_KEY;
  if (!key || !location) return null;             // ✅ skip if no key
  const url = "https://maps.googleapis.com/maps/api/geocode/json";
  const { data } = await axios.get(url, { params: { address: location, key } });
  if (data.status === "OK" && data.results.length) {
    return data.results[0].geometry.location;     // { lat, lng }
  }
  return null;
};
exports.addUpdate = async (req, res) => {
  try {
    const { description, location } = req.body;
    if (!description || !location) {
      return res.status(400).json({ message: "description and location are required" });
    }

    const coords = await geocode(location).catch(() => null);
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const saved = await Update.create({
      description,
      location,
      photo,
      coordinates: coords || undefined,
    });

    res.json(saved);
  } catch (err) {
    console.error("addUpdate error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getUpdates= async (req,res)=> {
    try{
        const updates =await update.find().sort({ createdAt: -1 });
        res.json(updates);
    }catch(err){
        console.error('getUpdates error:', err);
        res.status(500).json({message:'server error'});
    }
};
exports.deleteUpdate=async(req,res)=>{
    try {
        const{id}= req.params;
        await Update.findByIdAndDelete(id);
        res.json({message:'deleted'});
    } catch (err) {
        res.status(500).json({message:'server error'})
        
    }
}