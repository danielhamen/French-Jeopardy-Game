class Question {
  constructor(
    questionInfo = {
      questionTitle: "",
      questionPoints: 0,
      questionBody: "",
    },
  ) {
    this.questionTitle = questionInfo.questionTitle;
    this.questionPoints = questionInfo.questionPoints;
    this.questionBody = questionInfo.questionBody;
  }
}

class Category {
  constructor(
    categoryInfo = {
      categoryName: "",
      categoryItems: [],
    },
  ) {
    // Get info
    const categoryName = categoryInfo.categoryName;
    const categoryItems = categoryInfo.categoryItems;

    this.categoryName = categoryName;
    /*** @type {Question[]} */
    this.categoryItems = categoryItems;
  }
}

class Jeopardy {
  constructor() {
    /*** @type {Category[]} */
    this.categoryList = [];
  }

  /**
   * @returns {Category}
   */
  pushCategory(
    categoryInfo = {
      categoryName: "",
      categoryItems: "",
    },
  ) {
    const category = new Category(categoryInfo);
    this.categoryList.push(category);

    return category;
  }
}

window.addEventListener("load", () => {
  const game = new Jeopardy();

  const c1 = game.pushCategory({
    categoryName: "Daniel Hamen",
    categoryItems: [
      new Question({
        questionTitle: "Pourquoi est t'il en retard chaque matin?",
        questionPoints: 200,
        questionBody: "Il fait les annonces.",
      }),
      new Question({
        questionTitle: "Ou va-t'il l'année prochaine? Pour étudier Quoi?",
        questionPoints: 400,
        questionBody:
          "Université technologique de l'Ontario (UOIT) pour le génie logiciel.",
      }),
      new Question({
        questionTitle: "Ou travaille i'll?",
        questionPoints: 600,
        questionBody: "Canadian Tire",
      }),
      new Question({
        questionTitle: "Quand est la mois de sa fète.",
        questionPoints: 800,
        questionBody: "Septembre",
      }),
      new Question({
        questionTitle:
          "Nomme ses frères en ordre d’ages (du plus jeune au plus vieux).",
        questionPoints: 1000,
        questionBody: "Gabe, Luke, Ben.",
      }),
    ],
  });

  const c2 = game.pushCategory({
    categoryName: "Histoire",
    categoryItems: [
      new Question({
        questionTitle: "Quelle femme fracais a dit “Qu’i'l mange du gatuaux”",
        questionPoints: 200,
        questionBody: "Marie-Antoinette",
      }),
      new Question({
        questionTitle:
          "Pendant la révolution française, quelle machine a été inventée pour tuer?",
        questionPoints: 400,
        questionBody: "La guillotine.",
      }),
      new Question({
        questionTitle: "Quel ancien conquérant romain a dépassé la France",
        questionPoints: 600,
        questionBody: "Julius Caesar.",
      }),
      new Question({
        questionTitle: "Quelle année a commencé la renaissance?",
        questionPoints: 800,
        questionBody: "1453",
      }),
      new Question({
        questionTitle:
          "Quelle était la nom du France avant d'être nommer la France.",
        questionPoints: 1000,
        questionBody: "Gaul",
      }),
    ],
  });

  const c3 = game.pushCategory({
    categoryName: "Media et les Fameux",
    categoryItems: [
      new Question({
        questionTitle:
          "Quel film de Disney (princesse) est établi dans une ville française?",
        questionPoints: 200,
        questionBody: "Beauty and the Beast.",
      }),
      new Question({
        questionTitle:
          "Quelle femme francias a cree le parfume fameu “Chanel #5”",
        questionPoints: 400,
        questionBody: "Coco Chanel.",
      }),
      new Question({
        questionTitle: "Quel roi a été nommé “le roi du soleil”?",
        questionPoints: 600,
        questionBody: "Louis XIV.",
      }),
      new Question({
        questionTitle: "Quel homme français était banni sur une île 2 fois?",
        questionPoints: 800,
        questionBody: "Napoleon Bonaparte",
      }),
      new Question({
        questionTitle:
          "Quel acteur français a joué le rôle de Fezzik dans The Princess Bride?",
        questionPoints: 1000,
        questionBody: "André René Roussimoff",
      }),
    ],
  });

  const c4 = game.pushCategory({
    categoryName: "Divers",
    categoryItems: [
      new Question({
        questionTitle: "C’est quoi la capitale des États-Unis?",
        questionPoints: 200,
        questionBody: "Washington, DC.",
      }),
      new Question({
        questionTitle: "Les français ont inventé quel dessert d'été?",
        questionPoints: 400,
        questionBody: "Crème brûlée.",
      }),
      new Question({
        questionTitle:
          "Quel groupe sanguin est considéré comme le « donneur universel »",
        questionPoints: 600,
        questionBody: "Groupe d'O.",
      }),
      new Question({
        questionTitle: "Combien de centaine de mètres est la tour CN?",
        questionPoints: 800,
        questionBody: "553.3 m-high (1,815.3 ft. pour 1/2 pt.)",
      }),
      new Question({
        questionTitle: "Quel produit chimique rend les plantes vertes",
        questionPoints: 1000,
        questionBody: "Chlorophyll",
      }),
    ],
  });

  // Render Ui
  /**
   * @param {Jeopardy} jeopardy
   */
  function renderUi(jeopardy) {
    const categoryTable = document.querySelector("table#categories");
    const theadRow = categoryTable.querySelector("thead>tr");
    const tbody = categoryTable.querySelector("tbody");

    jeopardy.categoryList.forEach((category) => {
      // Add header
      const categoryTitle = document.createElement("th");
      categoryTitle.innerText = category.categoryName;
      theadRow.appendChild(categoryTitle);

      // Add tiles
      category.categoryItems.forEach((question, i) => {
        const tile = document.createElement("td");
        tile.innerText = question.questionPoints;

        // Get correct <tr>
        let tr = tbody.querySelector(`tr:nth-of-type(${i + 1})`);
        if (!tr) {
          tr = tbody.appendChild(document.createElement("tr"));
        }

        tr.appendChild(tile);

        tile.addEventListener("click", () => {
          if (tile.classList.contains("disabled")) return;

          tile.classList.add("disabled");

          const questionDialog = document.querySelector("#question");
          const questionBackground = document.querySelector("#background");
          const questionTitle =
            questionDialog.querySelector("h3#question-title");

          questionTitle.innerText = question.questionTitle;

          questionDialog.querySelector("#category").innerText =
            category.categoryName;
          questionDialog.querySelector("#pts").innerText =
            question.questionPoints;

          const questionAnswer =
            questionDialog.querySelector("#question-answer");
          questionAnswer.innerText = question.questionBody;
          questionAnswer.classList.remove("visible");

          questionBackground.classList.add("visible");
          questionDialog.classList.add("visible");

          const onKeypress = (e) => {
            if (e.key === " ") {
              if (questionAnswer.classList.contains("visible")) {
                questionDialog.classList.remove("visible");
                questionBackground.classList.remove("visible");
                window.removeEventListener("keydown", onKeypress);
              } else {
                questionAnswer.classList.add("visible");
              }
            } else {
              return;
            }
          };

          window.addEventListener("keydown", onKeypress);
        });
      });
    });
  }

  renderUi(game);
});
