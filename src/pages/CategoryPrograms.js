import { useEffect, useContext } from "react";
import { ChannelsContext } from "../context/ChannelsContext";

const CategoryPrograms = (props) => {
  let { categoryId } = props.match.params;
  const { getProgramsByCategory, programsByCategory } = useContext(
    ChannelsContext
  );

  switch (categoryId) {
    case "Barn 3 - 8 år":
      categoryId = 2;
      console.log("categoryId is now, ", categoryId);
      break;
    case "Barn 9 - 13 år":
      categoryId = 132;
      console.log("categoryId is now, ", categoryId);
      break;
    case "Dokumentär":
      categoryId = 82;
      console.log("categoryId is now, ", categoryId);
      break;
    case "Drama":
      categoryId = 134;
      console.log("categoryId is now, ", categoryId);
      break;
    case "Ekonomi":
      categoryId = 135;
      console.log("categoryId is now, ", categoryId);
      break;
    case "Humor":
      categoryId = 133;
      console.log("categoryId is now, ", categoryId);
      break;
    case "Kultur/Nöje":
      categoryId = 3;
      console.log("categoryId is now, ", categoryId);
      break;
    case "Livsstil":
      categoryId = 14;
      console.log("categoryId is now, ", categoryId);
      break;
    case "Livsåskådning":
      categoryId = 4;
      console.log("categoryId is now, ", categoryId);
      break;
    case "Musik":
      categoryId = 5;
      console.log("categoryId is now, ", categoryId);
      break;
  }
  useEffect(() => {
    console.log("category prop", categoryId);
    getProgramsByCategory(categoryId);
  }, []);

  const renderProgramsByCategory = () => {
    return (
      <div>
        {programsByCategory.programs.map((program, index) => (
          <div key={index}>
            <img src={program.programimage} alt={program.name} />
            <h3>{program.name}</h3>
            <p>{program.description}</p>
            <p>{program.broadcastinfo}</p>
            <a href={program.programurl}>Gå till program</a>
          </div>
        ))}
      </div>
    );
  };
  let content = <h3>Loading programs...</h3>;
  if (programsByCategory) {
    content = renderProgramsByCategory();
    console.log("ProgramsByCategory", programsByCategory);
  } else {
    content = <h3>Failed to load programs...</h3>;
  }
  return (
    <div>
      <h1>this is category programs page</h1>
      {content}
    </div>
  );
};

export default CategoryPrograms;
