import { render, fireEvent, screen } from '@testing-library/react';
import Bookmark from './Bookmark';
import CreateFlashcardForm from './CreateFlashcardForm';

test('default render 2 flashcards', () => {
  fetch(
    "https://itp-404-final-project-api.herokuapp.com/api/flashcards?_sort=id&_order=desc"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ flashcards: json });
    })
    .then(() => {
      const numFlashcards = json.length;
      expect(numFlashcards).toBe(2);
    })
});

test('default render 1 favorite', () => {
  fetch(
    "https://itp-404-final-project-api.herokuapp.com/api/flashcards?_sort=id&_order=desc"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ flashcards: json });
    })
    .then(() => {
      const numFavs = 0;
      flashcards.map((flashcard) => {
        if (flashcard.favorite) {
          numFavs++;
        }
      });
      expect(numFavs).toBe(1);
    })
});

test('check that flashcard 0 is favorited', () => {
  fetch(
    "https://itp-404-final-project-api.herokuapp.com/api/flashcards?_sort=id&_order=desc"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ flashcards: json });
    })
    .then(() => {
      expect(json[0].favorite).toBe(true);
    })
});

test('clicking a favorited bookmark', () => {
  const onClick = jest.fn();

  fetch(
    "https://itp-404-final-project-api.herokuapp.com/api/flashcards?_sort=id&_order=desc"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ flashcards: json });
    })
    .then(() => {
      const { getAllByTestID } = render(<Bookmark
        flashcard={json[0]}
        data-testid="bookmark"
      />);

      const bookmark = getAllByTestID("bookmark")[0];
      fireEvent.click(bookmark);

      expect(onClick).toHaveBeenCalledWith(0);
    });
});

test('favoriting a bookmark', () => {
  const onClick = jest.fn();

  fetch(
    "https://itp-404-final-project-api.herokuapp.com/api/flashcards?_sort=id&_order=desc"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ flashcards: json });
    })
    .then(() => {
      const { getAllByTestID } = render(<Bookmark
        flashcard={json[1]}
        data-testid="bookmark"
      />);

      const bookmark = getAllByTestID("bookmark")[0];
      fireEvent.click(bookmark);

      expect(onClick).toHaveBeenCalledWith(1)
    });
});

test('check that favorite has timestamp', () => {
  fetch(
    "https://itp-404-final-project-api.herokuapp.com/api/flashcards?_sort=id&_order=desc"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ flashcards: json });
      const flashcard0 = json[0];

      const hasTime = (flashcard0.favoriteTimestamp != "");
      expect(hasTime).toBe(true);
    });
});

test('check that clicked favorite has timestamp', () => {
  const onClick = jest.fn();
  const flashcard1 = "";

  fetch(
    "https://itp-404-final-project-api.herokuapp.com/api/flashcards?_sort=id&_order=desc"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ flashcards: json });
      flashcard1 = json[1];
    })
    .then(() => {
      const { getAllByTestID } = render(<Bookmark
        flashcard={flashcard1}
        data-testid="bookmark"
      />);

      const bookmark = getAllByTestID("bookmark")[0];
      fireEvent.click(bookmark);

      const hasTime = (flashcard1.favoriteTimestamp != "");
      expect(hasTime).toBe(true);
    });
});

test('create flashcard', () => {
  render(<CreateFlashcardForm
    title="Flashcard 2"
    body="Definition 2"
  />);

  fetch(
    "https://itp-404-final-project-api.herokuapp.com/api/flashcards?_sort=id&_order=desc"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ flashcards: json });
    })
    .then(() => {
      const numFlashcards = json.length;
      expect(numFlashcards).toBe(3);
    });
});

test('edit flashcard', () => {
  const flashcard1 = "";

  fetch(
    "https://itp-404-final-project-api.herokuapp.com/api/flashcards?_sort=id&_order=desc"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ flashcards: json });
      flashcard1 = json[1];
    })
    .then(() => {
      render(<EditFlashcardForm
        flashcard={flashcard1}
        title="Flashcard 1 edited"
        body="Definition 1 edited"
      />);
    });

  const newFlashcard1 = "";

  fetch(
    "https://itp-404-final-project-api.herokuapp.com/api/flashcards?_sort=id&_order=desc"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ flashcards: json });
      newFlashcard1 = json[1];
    })
    .then(() => {
      expect(newFlashcard1.title).toBe("Flashcard 1 edited");
      expect(newFlashcard1.body).toBe("Definition 1 edited");
    });
});

test('render default bookmark color', () => {
  const flashcard = "";

  fetch(
    "https://itp-404-final-project-api.herokuapp.com/api/flashcards?_sort=id&_order=desc"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ flashcards: json });
      flashcard = json[0];
    })
    .then(() => {
      const { getAllByTestID } = render(<Bookmark
        flashcard={flashcard}
        data-testid="bookmark"
      />);

      const bookmark = getAllByTestID("bookmark")[0];
      expect(bookmark.color).toBe('maroon');
    });
});

test('render custom bookmark color', () => {
  const flashcard = "";
  const customColor = "purple";

  fetch(
    "https://itp-404-final-project-api.herokuapp.com/api/flashcards?_sort=id&_order=desc"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ flashcards: json });
      flashcard = json[0];
    })
    .then(() => {
      const { getAllByTestID } = render(<Bookmark
        flashcard={flashcard}
        color={customColor}
        data-testid="bookmark"
      />);

      const bookmark = getAllByTestID("bookmark")[0];
      expect(bookmark.color).toBe(customColor);
    });
});