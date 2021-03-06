import gql from 'graphql-tag';

export default gql`
  query Conflicts(
    $projectId: ID!
    $revisionId: ID!
    $query: String
    $page: Int
    $document: ID
  ) {
    viewer {
      project(id: $projectId) {
        id

        documents {
          entries {
            id
            path
            format
          }
        }

        revision(id: $revisionId) {
          id

          translations(
            query: $query
            page: $page
            pageSize: 20
            document: $document
            isConflicted: true
          ) {
            meta {
              totalEntries
              totalPages
              currentPage
              nextPage
              previousPage
            }
            entries {
              id
              key
              conflictedText
              correctedText
              valueType

              lintMessages {
                text
                check
                replacement {
                  value
                  label
                }
              }

              revision {
                id
                isMaster
                name

                language {
                  id
                  name
                }
              }

              relatedTranslations {
                id
                correctedText
                isConflicted
                revision {
                  id
                  isMaster
                  name

                  language {
                    id
                    name
                  }
                }
              }

              document {
                id
                path
              }
            }
          }
        }
      }
    }
  }
`;
