// Calculate dictionary size
uint32_t dict_calc_buffer_size  // Dictionary Size
(
    uint8_t tuple_count,    // Number of tuples
    ...(uint8_t tuple_size) // Size of tuple...
)

// Calculate dictionary size
uint32_t dict_calc_buffer_size_from_tuplets // Dictionary Size
(
    Tuplet * tuplets,       // Array of tuplets
    uint8_t tuplets_count   // Number of tuplets in array
)

// Caclulate dictionary size
uint32_t dict_size  // Dictionary Size
(
    DictionaryIterator * iter   // Dictionary
)

// Get tuple from dictionary based on key
Tuple * dict_find   // Found Tuple
(
    DictionaryIterator * iter,  // Dictionary
    uint32_t key                // Key
)

// Initialize dictionary iterator
Tuple * dict_read_begin_from_buffer // First tuple in dictionary
(
    DictionaryIterator * iter,  // Dictionary
    uint8_t * buffer,           // Buffer?
    uint16_t size               // Storage size of dictionary
)

// Reset dictionary iterator
Tuple * dict_read_first // First tuple in dictionary
(
    DictionaryIterator * iter   // Dictionary
)

// Step dictionary iterator
Tuple * dict_read_next  // Next tuple in dictionary
(
    DictionaryIterator * iter   // Dictionary
)

// Merge source dictionary into destination dictionary
DictionaryResult dict_merge
(
    DictionaryIterator * dest,                  // Destination dictionary
    uint32_t * dest_max_size_in_out,            // Maximum size of dictionary
    DictionaryIterator * source,                // Source dictionary
    bool update_existing_keys_only,             // If TRUE, then don't add new keys to destination
    DictionaryKeyUpdatedCallback key_callback,  // Callback for each merged tuple
    void * context                              // callback argument
)

// Serialize array of tuplets into dictionary
DictionaryResult dict_serialize_tuplets
(
    DictionarySerializeCallback callback,   // callback?
    void * context,                         // callback argument
    Tuplet * tuplets,                       // Array of tuplets
    uint8_t tuplets_count                   // Number of tuplets
)

// Serialize array of tuplets into dictionary
DictionaryResult dict_serialize_tuplets_to_buffer
(
    Tuplet * tuplets,       // Array of tuplets
    uint8_t tuplets_count,  // Number of tuplets
    uint8_t * buffer,       // Buffer?
    uint32_t * size_in_out  // Buffer_size?
)

// Serialize array of tuplets into dictionary
DictionaryResult dict_serialize_tuplets_to_buffer_with_iter
(
    DictionaryIterator * iter,  // Dictionary
    Tuplet * tuplets,           // Array of tuplets
    uint8_t tuplets_count,      // Number of tuplets
    uint8_t * buffer,           // Buffer?
    uint32_t * size_in_out      // Buffer_size?
)

// Prepare dictionary for write
DictionaryResult dict_write_begin
(
    DictionaryIterator * iter,  // Dictionary
    uint8_t * buffer,           // Buffer?
    uint16_t size               // Buffer_size?
)

// Finish writing to dictionary
uint32_t dict_write_end
(
    DictionaryIterator * iter   // Dictionary
)

// Write C string to dictionary
DictionaryResult dict_write_cstring
(
    DictionaryIterator * iter,  // Dictionary
    uint32_t key,               // Key
    char * cstring              // C string
)

// Write byte array to dictionary
DictionaryResult dict_write_data
(
    DictionaryIterator * iter,  // Dictionary
    uint32_t key,               // Key
    uint8_t * data,             // Byte array
    uint16_t size               // Number of array elements
)

// Write Tuplet to dictionary
DictionaryResult dict_write_tuplet
(
    DictionaryIterator * iter,  // Dictionary
    Tuplet * tuplet             // Tuplet
)

// Write usigned 8-bit int to dictionary
DictionaryResult dict_write_uint8
(
    DictionaryIterator * iter,  // Dictionary
    uint32_t key,               // Key
    uint8_t value               // Unsigned 8-bit int
)

// Write int to dictionary
DictionaryResult dict_write_int
(
    DictionaryIterator * iter,  // Dictionary
    uint32_t key,               // Key
    void * integer,             // Integer
    uint8_t width_bytes,        // Width of integer
    bool is_signed              // Signed/Unsigned integer
)
