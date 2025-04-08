// Pet pedigree chart display component
import { useEffect, useRef, useState } from "react";

const PetigreePage = () => {
    const treeRef = useRef(null);
    const [petType, setPetType] = useState("buddy"); // "buddy", "spot" or "snowy"

    useEffect(() => {
        if (!treeRef.current || !window.FamilyTree) return;

        const options = getOptions();

        const chart = new window.FamilyTree(treeRef.current, {
            mouseScrool: window.FamilyTree.none,
            scaleInitial: 1, 
            siblingSeparation: 160, 
            subtreeSeparation: 180, 
            template: 'john',
            nodeBinding: {
                field_0: "name",
                field_1: "title",
                img_0: "img",
            },
            nodeSize: { width: 180, height: 180 },
            enableHTMLContent: true,
        });

        // Choose which data to load based on pet type
        let data;
        if (petType === "buddy") {
            data = getBuddyPedigreeData();
        } else if (petType === "spot") {
            data = getSpotPedigreeData();
        } else {
            data = getSnowyPedigreeData();
        }
        
        chart.load(data);
              
    }, [petType]);

    function getBuddyPedigreeData() {
        return [
            // 🐶 Generation 0 (Great-Grandparents)
            { id: 100, pids: [101], name: "Rex", title: "Great-Grandfather", img: "/pedigree/grandfather2.jpg", gender: "male", weight: '28 kg', Age: 'Died at 13 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Maria Gotarz', Previous_Owners: 'N/A' },
            { id: 101, pids: [100], name: "Lady", title: "Great-Grandmother", img: "/pedigree/Lady2.jpeg", gender: "female", weight: '26 kg', Age: 'Died at 12 years old', Vaccinations: 'Yes', Medical_History: 'None', Common_Health_Issues_For_Breed: 'None', Current_Owners: 'Maria Gotarz', Previous_Owners: 'N/A' },
        
            { id: 102, pids: [103], name: "Zeus", title: "Great-Grandfather", img: "/pedigree/Zeus.jpeg", gender: "male", weight: '35 kg', Age: 'Died at 14 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Irene Lidija', Previous_Owners: 'Maria Gotarz' },
            { id: 103, pids: [102], name: "Chloe", title: "Great-Grandmother", img: "/pedigree/Rex.jpg", gender: "female", weight: '32 kg', Age: 'Died at 13 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Obabek Karna', Previous_Owners: 'Maria Gotarz' },
            
            { id: 104, pids: [105], name: "Thor", title: "Great-Grandfather", img: "/pedigree/Grandfather1.jpg", gender: "male", weight: '27 kg', Age: 'Died at 15 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Simon Tilda', Previous_Owners: 'Maria Gotarz' },
            { id: 105, pids: [104], name: "Maggie", title: "Great-Grandmother", img: "/pedigree/Grandmother1.jpeg", gender: "female", weight: '26 kg', Age: 'Died at 14 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Hiniki Aravinda', Previous_Owners: 'Maria Gotarz' },
        
            { id: 106, pids: [107], name: "Diesel", title: "Great-Grandfather", img: "/pedigree/Lady.webp", gender: "male", weight: '28 kg', Age: 'Died at 11 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Irene Lidija', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 107, pids: [106], name: "Lucy", title: "Great-Grandmother", img: "/pedigree/Chloe.webp", gender: "female", weight: '30 kg', Age: 'Died at 10 years old', Vaccinations: 'Yes', Medical_History: 'Diabetes', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Bertie Toni', Previous_Owners: 'Clare Toni, Bart Nelly' },
        
            // 🐶 Generation 1 (Grandparents)
            { id: 1, mid: 101, fid: 100, pids: [2], name: "Max", title: "Grandfather", img: "/pedigree/Max.jpg", gender: "male", weight: '30 kg', Age: '10 years old (01/06/2015)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Valentin Azad', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 2, mid: 103, fid: 102, pids: [1], name: "Lucy", title: "Grandmother", img: "/pedigree/Bella.jpg", gender: "male", weight: '32 kg', Age: '10 years old (01/06/2015)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Katarina Sandeep', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 3, mid: 105, fid: 104, pids: [4], name: "Rocky", title: "Grandfather", img: "/pedigree/Rocky.jpg", gender: "male", weight: '25 kg', Age: '12 years old (01/06/2013)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Stav Halkyone', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 4, mid: 107, fid: 106, pids: [3], name: "Luna", title: "Grandmother", img: "/pedigree/uncle1.jpg", gender: "female", weight: '29 kg', Age: '13 years old (01/06/2012)', Vaccinations: 'Yes', Medical_History: 'Diabetes', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Holly Anna', Previous_Owners: 'Clare Toni, Bart Nelly' },
        
            // 🐶 Generation 2 (Parents and Siblings)
            { id: 5, mid: 2, fid: 1, pids: [6], name: "Charlie", title: "Father", img: "/pedigree/Dad1.png", gender: "male", weight: '29 kg', Age: '7 years old (01/06/2018)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Murad Samar', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 6, mid: 4, fid: 3, pids: [5], name: "Daisy", title: "Mother", img: "/pedigree/Mom1.jpeg", gender: "female", weight: '27 kg', Age: '8 years old (02/14/2017)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Christian Hussain', Previous_Owners: 'Clare Toni, Bart Nelly' },
        
            { id: 8, mid: 2, fid: 1, pids: [9], name: "Cooper", title: "Uncle", img: "/pedigree/aunt2.jpg", gender: "male", weight: '35 kg', Age: '6 years old (01/06/2019)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Gustav Pembe', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 9, pids: [8], name: "Sadie", title: "Aunt", img: "/pedigree/aunt1.webp", gender: "female", weight: '32 kg', Age: '5 years old (02/14/2020)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Chip Kateri', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 10, mid: 4, fid: 3, pids: [11], name: "Duke", title: "Uncle", img: "/pedigree/uncle2.jpg", gender: "male", weight: '28 kg', Age: '6 years old (06/14/2019)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Noor Doris', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 11, pids: [10], name: "Molly", title: "Aunt", img: "/pedigree/Molly.jpeg", gender: "female", weight: '29 kg', Age: '5 years old (02/14/2020)', Vaccinations: 'Yes', Medical_History: 'Diabetes', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Polly Baptiste', Previous_Owners: 'Clare Toni, Bart Nelly' },
        
            // 🐶 Generation 3 (Puppies and Cousins)
            { id: 7, mid: 6, fid: 5, name: "Buddy", title: "Puppy", img: "/pedigree/puppy1.jpg", gender: "male", weight: '12 kg', Age: '5 months old (09/01/2024)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Molly McKay', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 12, mid: 6, fid: 5, name: "Bailey", title: "Sibling", img: "/pedigree/puppy2.avif", gender: "female", weight: '9 kg', Age: '5 months old (09/01/2024)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Rebecca Fatjon', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 13, mid: 6, fid: 5, name: "Milo", title: "Sibling", img: "/pedigree/puppy3.jpg", gender: "male", weight: '9 kg', Age: '5 months old (09/01/2024)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Vanna Godabert', Previous_Owners: 'Clare Toni, Bart Nelly' },
        
            // 🐾 Children of Cooper and Sadie (Cousins)
            { id: 40, mid: 9, fid: 8, name: "Rosie", title: "Cousin", img: "/pedigree/Rosie.jpg", gender: "female", weight: '10 kg', Age: '6 months old (08/01/2024)', Vaccinations: 'No', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Abhishek Dositheos', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 41, mid: 9, fid: 8, name: "Teddy", title: "Cousin", img: "/pedigree/Teddy.jpg", gender: "male", weight: '8 kg', Age: '6 months old (08/01/2024)', Vaccinations: 'No', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Gordan Dositheos', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 42, mid: 9, fid: 8, name: "Ruby", title: "Cousin", img: "/pedigree/Bentley.jpg", gender: "female", weight: '12 kg', Age: '6 months old (08/01/2024)', Vaccinations: 'No', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Shane Dalila', Previous_Owners: 'Clare Toni, Bart Nelly' },
        
            // 🐾 Children of Duke and Molly (Cousins)
            { id: 43, mid: 11, fid: 10, name: "Ollie", title: "Cousin", img: "/pedigree/Ollie.jpg", gender: "male", weight: '10 kg', Age: '6 months old (08/15/2024)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Bronislav Babur', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 44, mid: 11, fid: 10, name: "Lily", title: "Cousin", img: "/pedigree/Lily.avif", gender: "female", weight: '8 kg', Age: '6 months old (08/15/2024)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Yosef Meshullemeth', Previous_Owners: 'Clare Toni, Bart Nelly' },
            { id: 45, mid: 11, fid: 10, name: "Bentley", title: "Cousin", img: "/pedigree/Ruby.jpg", gender: "male", weight: '10 kg', Age: '6 months old (08/15/2024)', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Labrador Retriever', Common_Health_Issues_For_Breed: 'Hip/Elbow Dysplasia, Heart Conditions', Current_Owners: 'Jasue Augusto', Previous_Owners: 'Clare Toni, Bart Nelly' },
        ];
    }

    function getSpotPedigreeData() {
        return [
            //  Generation 0 (Grandparents)
            { id: 1, pids: [2], name: "Shadow", title: "Grandfather", img: "/pedigree/Oliver_dog.jpg", gender: "male", weight: '9 kg', Age: 'Died at 15 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Beagle', Common_Health_Issues_For_Breed: 'Hip Dysplasia, Epilepsy, Cherry Eye', Current_Owners: 'Garrett Jackson', Previous_Owners: 'N/A' },
            { id: 2, pids: [1], name: "Misty", title: "Grandmother", img: "/pedigree/Bella_dog.jpg", gender: "female", weight: '11 kg', Age: 'Died at 16 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Beagle', Common_Health_Issues_For_Breed: 'Hip Dysplasia, Epilepsy, Cherry Eye', Current_Owners: 'Olivia Maryamu', Previous_Owners: 'Wally Jackson' },
            
            { id: 3, pids: [4], name: "Oliver", title: "Grandfather", img: "/pedigree/Shadow_dog.jpeg", gender: "male", weight: '10 kg', Age: 'Died at 14 years old', Vaccinations: 'Yes', Medical_History: 'Diabetes', Breed: 'Beagle', Common_Health_Issues_For_Breed: 'Hip Dysplasia, Epilepsy, Cherry Eye', Current_Owners: 'Garrett Jackson', Previous_Owners: 'N/A' },
            { id: 4, pids: [3], name: "Bella", title: "Grandmother", img: "/pedigree/Misty_dog.jpg", gender: "female", weight: '9.5 kg', Age: 'Died at 17 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Beagle', Common_Health_Issues_For_Breed: 'Hip Dysplasia, Epilepsy, Cherry Eye', Current_Owners: 'Nadejda Chavaqquq', Previous_Owners: 'Garrett Jackson, Wally Jackson' },
            
            //  Generation 1 (Parents)
            { id: 5, mid: 2, fid: 1, pids: [6], name: "Leo", title: "Father", img: "/pedigree/dog_leo.webp", gender: "male", weight: '10 kg', Age: '8 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Beagle', Common_Health_Issues_For_Breed: 'Hip Dysplasia, Epilepsy, Cherry Eye', Current_Owners: 'Regina Asherah', Previous_Owners: 'Garrett Jackson, Wally Jackson' },
            { id: 6, mid: 4, fid: 3, pids: [5], name: "Luna", title: "Mother", img: "/pedigree/Luna_dog.jpeg", gender: "female", weight: '8.5 kg', Age: '7 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Beagle', Common_Health_Issues_For_Breed: 'Hip Dysplasia, Epilepsy, Cherry Eye', Current_Owners: 'Keighley Leutwin', Previous_Owners: 'Garrett Jackson, Wally Jackson' },
            
            //  Generation 2 (Kittens)
            { id: 7, mid: 6, fid: 5, name: "Spot", title: "Dog", img: "https://dogtime.com/wp-content/uploads/sites/12/2023/11/GettyImages-157603001-e1701106766955.jpg?w=1024", circleImg: "https://dogtime.com/wp-content/uploads/sites/12/2023/11/GettyImages-157603001-e1701106766955.jpg?w=1024", gender: "male", weight: '5 kg', Age: '6 months old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Beagle', Common_Health_Issues_For_Breed: 'Hip Dysplasia, Epilepsy, Cherry Eye', Current_Owners: 'Molly McKay', Previous_Owners: 'Garrett Jackson, Wally Jackson' },
            { id: 8, mid: 6, fid: 5, name: "Cleo", title: "Sibling", img: "/pedigree/Cleo.jpg", gender: "female", weight: '9 kg', Age: '6 months old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Beagle', Common_Health_Issues_For_Breed: 'Hip Dysplasia, Epilepsy, Cherry Eye', Current_Owners: 'Polly Mullen', Previous_Owners: 'Garrett Jackson, Wally Jackson' },
            { id: 9, mid: 6, fid: 5, name: "Brownie", title: "Sibling", img: "/pedigree/Simba.jpeg", gender: "male", weight: '10 kg', Age: '6 months old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Beagle', Common_Health_Issues_For_Breed: 'Hip Dysplasia, Epilepsy, Cherry Eye', Current_Owners: 'Bob Green', Previous_Owners: 'Garrett Jackson, Wally Jackson' },
            { id: 10, mid: 6, fid: 5, name: "Bella", title: "Sibling", img: "/pedigree/Nala.jpg", gender: "female", weight: '8.5 kg', Age: '6 months old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Beagle', Common_Health_Issues_For_Breed: 'Hip Dysplasia, Epilepsy, Cherry Eye', Current_Owners: 'Shawn Mendes', Previous_Owners: 'Garrett Jackson, Wally Jackson' },
        ];
    }

    function getSnowyPedigreeData() {
        return [
            // Generation 0 (Grandparents)
            { id: 1, pids: [2], name: "Frosty", title: "Grandfather", img: "/pedigree/Frosty.jpg", gender: "male", weight: '4 kg', Age: 'Died at 12 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Persian', Common_Health_Issues_For_Breed: 'Deafness and Sun Cancer', Current_Owners: 'John Doe', Previous_Owners: 'N/A' },
            { id: 2, pids: [1], name: "Crystal", title: "Grandmother", img: "/pedigree/Crystal.jpeg", gender: "female", weight: '4 kg', Age: 'Died at 13 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Persian', Common_Health_Issues_For_Breed: 'Deafness and Sun Cancer', Current_Owners: 'Sharma Theo', Previous_Owners: 'John Doe' },
            
            { id: 3, pids: [4], name: "Glacier", title: "Grandfather", img: "/pedigree/Glacier.webp", gender: "male", weight: '5 kg', Age: 'Died at 14 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Persian', Common_Health_Issues_For_Breed: 'Deafness and Sun Cancer', Current_Owners: 'Ferdi Asim', Previous_Owners: 'N/A' },
            { id: 4, pids: [3], name: "Aurora", title: "Grandmother", img: "/pedigree/Aurora.jpg", gender: "female", weight: '4 kg', Age: 'Died at 15 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Persian', Common_Health_Issues_For_Breed: 'Deafness and Sun Cancer', Current_Owners: 'Julia Kiku', Previous_Owners: 'John Doe' },
            
            // Generation 1 (Parents)
            { id: 5, mid: 2, fid: 1, pids: [6], name: "Blizzard", title: "Father", img: "/pedigree/Blizzard.jpeg", gender: "male", weight: '5 kg', Age: '7 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Persian', Common_Health_Issues_For_Breed: 'Deafness and Sun Cancer', Current_Owners: 'Purdie Eldar', Previous_Owners: 'N/A' },
            { id: 6, mid: 4, fid: 3, pids: [5], name: "Snowflake", title: "Mother", img: "/pedigree/Snowflake.webp", gender: "female", weight: '4 kg', Age: '6 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Persian', Common_Health_Issues_For_Breed: 'Deafness and Sun Cancer', Current_Owners: 'Veronika Fereh', Previous_Owners: 'John Doe' },
            
            // Generation 2 (Puppies)
            { id: 7, mid: 6, fid: 5, name: "Snowy", title: "Cat", img: "/pedigree/White_Cat.jpg", gender: "female", weight: '4 kg', Age: '2 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Persian', Common_Health_Issues_For_Breed: 'Deafness and Sun Cancer', Current_Owners: 'Molly McKay', Previous_Owners: 'Doris Priya' },
            { id: 8, mid: 6, fid: 5, name: "Frost", title: "Sibling", img: "/pedigree/Frost.jpeg", gender: "female", weight: '3.5 kg', Age: '2 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Persian', Common_Health_Issues_For_Breed: 'Deafness and Sun Cancer', Current_Owners: 'Wilbert Smith', Previous_Owners: 'Doris Priya, Leni Medrod' },
            { id: 9, mid: 6, fid: 5, name: "Ice", title: "Sibling", img: "/pedigree/Ice.webp", gender: "male", weight: '4 kg', Age: '2 years old', Vaccinations: 'Yes', Medical_History: 'None', Breed: 'Persian', Common_Health_Issues_For_Breed: 'Deafness and Sun Cancer', Current_Owners: 'Nihad Bianca', Previous_Owners: 'Doris Priya' },
        ];
    }

    function getOptions() {
        const searchParams = new URLSearchParams(window.location.search);
        var fit = searchParams.get('fit');
        var enableSearch = true;
        var scaleInitial = 1.5; 
        if (fit === 'yes') {
            enableSearch = false;
            scaleInitial = window.FamilyTree.match.boundary;
        }
        return { enableSearch, scaleInitial };
    }

    return (
        <div>
            <div style={{ padding: "10px", display: "flex", justifyContent: "center", gap: "20px" }}>
                <button 
                    onClick={() => setPetType("buddy")}
                    style={{ 
                        padding: "8px 16px", 
                        backgroundColor: petType === "buddy" ? "#FF8C00" : "#f0f0f0",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Buddy Pedigree
                </button>
                <button 
                    onClick={() => setPetType("spot")}
                    style={{ 
                        padding: "8px 16px", 
                        backgroundColor: petType === "spot" ? "#FF8C00" : "#f0f0f0",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Spot Pedigree
                </button>
                <button 
                    onClick={() => setPetType("snowy")}
                    style={{ 
                        padding: "8px 16px", 
                        backgroundColor: petType === "snowy" ? "#FF8C00" : "#f0f0f0",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Snowy Pedigree
                </button>
            </div>
            <div id="tree" ref={treeRef} style={{ width: "100%", height: "90vh" }}></div>
        </div>
    );
};

export default PetigreePage;
