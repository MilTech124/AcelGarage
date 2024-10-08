import { FormControl, InputLabel, Select, MenuItem, Grid, Card, CardActionArea, CardMedia } from '@mui/material';


function RoofSetting({selectedOptions, setSelectedOptions}) { 
 
    const roof =[
        {name: "blachodachówka", url: "./konfigurator/blachodachowka.png"},
        {name: "trapezowa", url: "./konfigurator/trapezowa.png"},
    ]
    const roofColor = [
        {name: "Antracyt", ral: "#272C38"},
        {name: "Ciemny Brąz 8017", ral: "#2F1D1D"},
        {name: "Brąz Jasny 8004", ral: "#85392C"},
        {name: "Ciemna Zieleń 6029", ral: "#0B3821"},
        {name: "Jasna Zieleń 6029", ral: "#117825"},
        {name: "Grafit 7016", ral: "#262F38"},
        {name: "Biały 9010", ral: "#FBFFFF"},
        {name: "Szary 9002", ral: "#F2EFE8"},
        {name: "Srebrny 9006", ral: "#A7ABB6"},
        {name: "Piaskowy 1002", ral: "#D7B075"},
        {name: "Czerwony 3011", ral: "#781416"},
        {name: "Wisniowy 3005", ral: "#4F121A"},
        {name: "Czarny 9005", ral: "#2C2C2C"}
      ];

      const handleSelectColor = (roofColor,roofColorRal) => {
        setSelectedOptions({ ...selectedOptions, roofColor,roofColorRal });
      };

      const handleMetalWorkRoofColor = (color,colorRal) => {    
        setSelectedOptions({ ...selectedOptions, metalWorkColorRoof:color,metalWorkColorRoofRal:colorRal}); 
      }

  return (
    <div className='py-2'>
        <h4 className="bg-slate-900 p-2">Pokrycie dachu</h4>
        <div className="flex gap-0 flex-wrap justify-evenly">
            {roof.map((type) => (
                <div key={type.name}>
                    <img key={type.name} onClick={() => setSelectedOptions({...selectedOptions, roofType: type.name})}
                    className={`w-32 h-16 object-cover ${selectedOptions.roofType ===type.name ? "border-4" :null}  `}
                    src={type.url}
                    alt={type.name}
                    />
                    <p className='text-center text-black'>{type.name}</p>
                </div>
         
            ))}
        </div>

        {/* Selektor koloru */}
      {/* Selektor koloru z obrazkami */}
      <Grid item xs={12} className='pt-2'>
        <div className='flex flex-wrap gap-2 ' spacing={2}>
          {roofColor.map((color) => (
          <div key={color.name} className={`max-w-[80px] ${selectedOptions.roofColor===color.name ? ' font-bold' : null}`}><div className='w-20 h-12 rounded-md' style={{backgroundColor:color.ral}} onClick={() => {handleSelectColor(color.name,color.ral)}}></div> <p className='text-xs text-center text-black'>{color.name}</p>       
          </div>
          ))}
        </div>
      </Grid>

      <div className='p-2 bg-slate-400 rounded-md m-2'>
      <h4>Obróbki dachu:</h4>
      <Grid item xs={12} className='pt-2'>
        <div className='flex flex-wrap gap-2 ' spacing={2}>
          {roofColor.map((color) => (
          <div key={color.name} className={`max-w-[80px] ${selectedOptions.metalWorkColorRoof===color.ral ? ' font-bold' : null}`}><div className='w-20 h-12 rounded-md' style={{backgroundColor:color.ral}} onClick={() =>handleMetalWorkRoofColor(color.ral,color.name) }></div> <p className='text-xs text-center text-black'>{color.name}</p>       
          </div>
          ))}
        </div>
      </Grid>

      </div>

      {/* Selektor koloru */}

    </div>
  )
}

export default RoofSetting